from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import sys
from pathlib import Path
from auth import hash_password

# Import route modules
from routes import projects, contact, admin

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Validate required environment variables
REQUIRED_ENV_VARS = ['MONGO_URL', 'DB_NAME', 'SECRET_KEY']
missing_vars = [var for var in REQUIRED_ENV_VARS if not os.getenv(var)]
if missing_vars:
    print(f"ERROR: Missing required environment variables: {', '.join(missing_vars)}")
    print("Please check your .env file in src/backend/")
    sys.exit(1)

# MongoDB connection - initialized in startup event
client = None
db = None

# Create the main app without a prefix
app = FastAPI(title="Developer Portfolio API", version="1.0.0")

# Create a router with the /api prefix for basic routes
api_router = APIRouter(prefix="/api")

@api_router.get("/")
async def root():
    return {"message": "Developer Portfolio API v1.0.0", "status": "active"}

@api_router.get("/health")
async def health_check():
    return {"status": "healthy", "database": "connected"}

# Include the basic router
app.include_router(api_router)

# Include feature routers (they already have /api prefix)
app.include_router(projects.router)
app.include_router(contact.router)
app.include_router(admin.router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@app.on_event("startup")
async def startup_event():
    """Initialize database and create default admin if not exists."""
    global client, db
    
    host = os.getenv('HOST', '0.0.0.0')
    port = os.getenv('PORT', '8000')
    
    logger.info("="*50)
    logger.info("Starting Portfolio Backend Server")
    logger.info("="*50)
    logger.info(f"Server will be available at: http://localhost:{port}")
    logger.info(f"API Documentation: http://localhost:{port}/docs")
    logger.info(f"API Endpoint: http://localhost:{port}/api")
    logger.info("="*50)
    logger.info("Connecting to MongoDB...")
    
    try:
        # Initialize MongoDB connection
        mongo_url = os.environ['MONGO_URL']
        client = AsyncIOMotorClient(
            mongo_url,
            serverSelectionTimeoutMS=30000,  # 30 second timeout
            connectTimeoutMS=30000,
            socketTimeoutMS=30000
        )
        db = client[os.environ['DB_NAME']]
        
        # Test connection
        await client.admin.command('ping')
        logger.info("✓ MongoDB connected successfully")
        
        # Set database for route modules
        projects.set_db(db)
        contact.set_db(db)
        admin.set_db(db)
        
        # Create default admin user if none exists
        admin_count = await db.admins.count_documents({})
        if admin_count == 0:
            default_admin = {
                "username": "admin",
                "password": hash_password("admin123"),  # Change this in production!
            }
            await db.admins.insert_one(default_admin)
            logger.info("✓ Created default admin user (username: admin, password: admin123)")
        
        # Create indexes for better performance
        await db.projects.create_index("id", unique=True)
        await db.contacts.create_index("id", unique=True)
        await db.admins.create_index("username", unique=True)
        logger.info("✓ Database indexes created")
        
        logger.info("="*50)
        logger.info("✓ Application startup complete")
        logger.info("✓ Server is ready to accept requests")
        logger.info("="*50)
        
    except Exception as e:
        logger.error("="*50)
        logger.error("✗ Failed to connect to MongoDB")
        logger.error(f"Error: {str(e)}")
        logger.error("Please check your MONGO_URL in .env file")
        logger.error("="*50)
        sys.exit(1)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
    logger.info("Application shutdown complete")