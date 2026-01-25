from fastapi import APIRouter, HTTPException, Depends, status
from typing import List
from models import (
    AdminLogin, TokenResponse, Admin,
    ProjectCreate, ProjectUpdate, Project,
    Contact, ContactUpdate
)
from auth import verify_password, create_access_token, get_current_admin, hash_password
from motor.motor_asyncio import AsyncIOMotorDatabase
from datetime import datetime
import logging

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/admin", tags=["admin"])

# Database dependency (will be injected)
db: AsyncIOMotorDatabase = None


def set_db(database: AsyncIOMotorDatabase):
    global db
    db = database


@router.post("/login", response_model=dict)
async def admin_login(credentials: AdminLogin):
    """Admin login endpoint."""
    try:
        # Find admin user
        admin = await db.admins.find_one({"username": credentials.username})
        
        if not admin or not verify_password(credentials.password, admin["password"]):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Incorrect username or password"
            )
        
        # Create access token
        access_token = create_access_token(data={"sub": admin["username"]})
        
        return {
            "success": True,
            "token": access_token,
            "username": admin["username"]
        }
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error during login: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/logout", response_model=dict)
async def admin_logout(current_admin: str = Depends(get_current_admin)):
    """Admin logout endpoint (client-side token removal)."""
    return {"success": True, "message": "Logged out successfully"}


# Project Management
@router.post("/projects", response_model=dict)
async def create_project(project_data: ProjectCreate, current_admin: str = Depends(get_current_admin)):
    """Create a new project."""
    try:
        project = Project(**project_data.dict())
        project_dict = project.dict()
        
        result = await db.projects.insert_one(project_dict)
        project_dict["_id"] = str(result.inserted_id)
        
        return {"success": True, "project": project_dict}
    except Exception as e:
        logger.error(f"Error creating project: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@router.put("/projects/{project_id}", response_model=dict)
async def update_project(
    project_id: str,
    project_data: ProjectUpdate,
    current_admin: str = Depends(get_current_admin)
):
    """Update a project."""
    try:
        update_data = {k: v for k, v in project_data.dict().items() if v is not None}
        update_data["updatedAt"] = datetime.utcnow()
        
        result = await db.projects.update_one(
            {"id": project_id},
            {"$set": update_data}
        )
        
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Project not found")
        
        updated_project = await db.projects.find_one({"id": project_id})
        updated_project["_id"] = str(updated_project["_id"])
        
        return {"success": True, "project": updated_project}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error updating project: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@router.delete("/projects/{project_id}", response_model=dict)
async def delete_project(project_id: str, current_admin: str = Depends(get_current_admin)):
    """Delete a project."""
    try:
        result = await db.projects.delete_one({"id": project_id})
        
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Project not found")
        
        return {"success": True, "message": "Project deleted successfully"}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error deleting project: {e}")
        raise HTTPException(status_code=500, detail=str(e))


# Contact Management
@router.get("/contacts", response_model=dict)
async def get_contacts(current_admin: str = Depends(get_current_admin)):
    """Get all contact messages."""
    try:
        contacts = await db.contacts.find().sort("createdAt", -1).to_list(100)
        
        for contact in contacts:
            contact["_id"] = str(contact["_id"])
        
        return {"success": True, "contacts": contacts}
    except Exception as e:
        logger.error(f"Error fetching contacts: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@router.put("/contacts/{contact_id}", response_model=dict)
async def update_contact(
    contact_id: str,
    contact_data: ContactUpdate,
    current_admin: str = Depends(get_current_admin)
):
    """Update contact message status."""
    try:
        update_data = {k: v for k, v in contact_data.dict().items() if v is not None}
        
        result = await db.contacts.update_one(
            {"id": contact_id},
            {"$set": update_data}
        )
        
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Contact not found")
        
        return {"success": True, "message": "Contact updated successfully"}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error updating contact: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@router.delete("/contacts/{contact_id}", response_model=dict)
async def delete_contact(contact_id: str, current_admin: str = Depends(get_current_admin)):
    """Delete a contact message."""
    try:
        result = await db.contacts.delete_one({"id": contact_id})
        
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Contact not found")
        
        return {"success": True, "message": "Contact deleted successfully"}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error deleting contact: {e}")
        raise HTTPException(status_code=500, detail=str(e))
