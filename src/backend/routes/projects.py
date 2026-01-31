from fastapi import APIRouter, HTTPException, Depends
from typing import List, Optional
from models import Project, ProjectCreate, ProjectUpdate
from auth import get_current_admin
from motor.motor_asyncio import AsyncIOMotorDatabase
from datetime import datetime
import logging

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/projects", tags=["projects"])

# Database dependency (will be injected)
db: AsyncIOMotorDatabase = None


def set_db(database: AsyncIOMotorDatabase):
    global db
    db = database


@router.get("", response_model=dict)
async def get_projects(tech: Optional[str] = None, status: Optional[str] = None):
    """Get all projects with optional filters."""
    try:
        query = {}
        if tech:
            query["techStack"] = {"$in": [tech]}
        if status:
            query["status"] = status
        
        projection = {"_id": 1, "id": 1, "name": 1, "description": 1, "techStack": 1, "features": 1, "liveDemo": 1, "githubRepo": 1, "status": 1, "createdAt": 1, "updatedAt": 1}
        projects = await db.projects.find(query, projection).sort("createdAt", -1).limit(50).to_list(50)
        
        logger.info(f"Fetched {len(projects)} projects in {query} with filters")
        
        # Convert MongoDB _id to string and remove it
        for project in projects:
            project["_id"] = str(project["_id"])
        
        return {"success": True, "projects": projects}
    except Exception as e:
        logger.error(f"Error fetching projects: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/{project_id}", response_model=dict)
async def get_project(project_id: str):
    """Get a single project by ID."""
    try:
        project = await db.projects.find_one({"id": project_id})
        if not project:
            raise HTTPException(status_code=404, detail="Project not found")
        
        project["_id"] = str(project["_id"])
        return {"success": True, "project": project}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error fetching project: {e}")
        raise HTTPException(status_code=500, detail=str(e))
