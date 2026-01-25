import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
import os

load_dotenv()

async def test_connection():
    try:
        mongo_url = os.getenv('MONGO_URL')
        print(f"Connecting to: {mongo_url}")
        
        client = AsyncIOMotorClient(mongo_url, serverSelectionTimeoutMS=5000)
        
        # Test the connection
        await client.admin.command('ping')
        print("✓ Successfully connected to MongoDB!")
        
        # List databases
        db_names = await client.list_database_names()
        print(f"✓ Available databases: {db_names}")
        
        client.close()
        
    except Exception as e:
        print(f"✗ Connection failed: {e}")

if __name__ == "__main__":
    asyncio.run(test_connection())
