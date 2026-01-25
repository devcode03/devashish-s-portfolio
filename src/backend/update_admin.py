"""
Script to update admin password.
"""
import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
from auth import hash_password
import os
from dotenv import load_dotenv
from pathlib import Path

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]


async def update_admin_password():
    """Update admin password."""
    new_password = "devashish@2803"
    
    result = await db.admins.update_one(
        {"username": "admin"},
        {"$set": {"password": hash_password(new_password)}}
    )
    
    if result.modified_count > 0:
        print(f"✓ Admin password updated successfully!")
        print(f"  Username: admin")
        print(f"  New Password: {new_password}")
    else:
        print("✗ No admin user found with username 'admin'")


async def main():
    print("Updating admin password...")
    await update_admin_password()
    client.close()


if __name__ == "__main__":
    asyncio.run(main())
