from fastapi import APIRouter, HTTPException
from models import Contact, ContactCreate
from motor.motor_asyncio import AsyncIOMotorDatabase
import logging

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/contact", tags=["contact"])

# Database dependency (will be injected)
db: AsyncIOMotorDatabase = None


def set_db(database: AsyncIOMotorDatabase):
    global db
    db = database


@router.post("", response_model=dict)
async def submit_contact(contact_data: ContactCreate):
    """Submit a contact form (mock email sending)."""
    try:
        contact = Contact(**contact_data.dict())
        contact_dict = contact.dict()
        
        # Insert into database
        result = await db.contacts.insert_one(contact_dict)
        
        # Mock email sending - just log it
        logger.info(f"Contact form submitted by {contact.email}: {contact.subject}")
        logger.info(f"Message: {contact.message}")
        
        return {
            "success": True,
            "message": "Thank you for reaching out! Your message has been received. (Email sending is mocked for now)"
        }
    except Exception as e:
        logger.error(f"Error submitting contact form: {e}")
        raise HTTPException(status_code=500, detail=str(e))
