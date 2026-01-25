"""
Seed script to populate initial data in the database.
"""
import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
from auth import hash_password
from models import Project, Admin
import os
from dotenv import load_dotenv
from pathlib import Path

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]


async def seed_admin():
    """Create default admin user."""
    admin_count = await db.admins.count_documents({})
    if admin_count == 0:
        admin = Admin(
            username="admin",
            password=hash_password("devashish@2803")
        )
        await db.admins.insert_one(admin.dict())
        print("✓ Created default admin (username: admin, password: admin123)")
    else:
        print("✓ Admin user already exists")


async def seed_projects():
    """Seed initial projects from mock data."""
    project_count = await db.projects.count_documents({})
    if project_count > 0:
        print(f"✓ Projects already exist ({project_count} projects)")
        return
    
    # Sample projects
    projects = [
        {
            "name": "E-Commerce Platform",
            "description": "Full-stack e-commerce solution with real-time inventory management, payment processing, and admin dashboard.",
            "techStack": ["React", "Node.js", "MongoDB", "Stripe", "Redis"],
            "features": [
                "Real-time inventory sync",
                "Stripe payment integration",
                "Admin dashboard with analytics",
                "Redis caching for performance",
                "JWT authentication"
            ],
            "liveDemo": "https://demo-ecommerce.example.com",
            "githubRepo": "https://github.com/username/ecommerce",
            "status": "production"
        },
        {
            "name": "AI Chat Application",
            "description": "Real-time chat application with AI-powered message suggestions and sentiment analysis.",
            "techStack": ["React", "WebSocket", "Python", "TensorFlow", "PostgreSQL"],
            "features": [
                "WebSocket real-time messaging",
                "AI message suggestions",
                "Sentiment analysis",
                "End-to-end encryption",
                "Group chat support"
            ],
            "liveDemo": "https://ai-chat.example.com",
            "githubRepo": "https://github.com/username/ai-chat",
            "status": "production"
        },
        {
            "name": "DevOps Dashboard",
            "description": "Kubernetes cluster monitoring dashboard with CI/CD pipeline visualization and log aggregation.",
            "techStack": ["Vue.js", "Go", "Kubernetes", "Prometheus", "Grafana"],
            "features": [
                "Real-time cluster metrics",
                "CI/CD pipeline tracking",
                "Log aggregation and search",
                "Alert management",
                "Custom dashboard builder"
            ],
            "liveDemo": "https://devops-dash.example.com",
            "githubRepo": "https://github.com/username/devops-dashboard",
            "status": "production"
        },
        {
            "name": "Code Collaboration Tool",
            "description": "Real-time code collaboration platform with live cursors, syntax highlighting, and version control.",
            "techStack": ["React", "Node.js", "Socket.io", "Monaco Editor", "Git"],
            "features": [
                "Real-time collaborative editing",
                "Live cursor tracking",
                "Syntax highlighting for 50+ languages",
                "Built-in version control",
                "Voice/video chat integration"
            ],
            "liveDemo": "https://code-collab.example.com",
            "githubRepo": "https://github.com/username/code-collab",
            "status": "beta"
        },
        {
            "name": "Performance Analytics Engine",
            "description": "High-performance analytics engine processing millions of events per second with custom query language.",
            "techStack": ["Rust", "TimescaleDB", "React", "GraphQL", "Apache Kafka"],
            "features": [
                "Custom query language (SQL-like)",
                "Real-time event processing",
                "Distributed architecture",
                "Sub-second query response",
                "Data visualization suite"
            ],
            "liveDemo": "https://analytics.example.com",
            "githubRepo": "https://github.com/username/analytics-engine",
            "status": "production"
        },
        {
            "name": "Blockchain Explorer",
            "description": "Multi-chain blockchain explorer with transaction tracking, wallet analysis, and smart contract verification.",
            "techStack": ["Next.js", "Web3.js", "Solidity", "MongoDB", "Redis"],
            "features": [
                "Multi-chain support (ETH, BSC, Polygon)",
                "Smart contract verification",
                "Wallet transaction history",
                "Gas price predictions",
                "NFT gallery integration"
            ],
            "liveDemo": "https://explorer.example.com",
            "githubRepo": "https://github.com/username/blockchain-explorer",
            "status": "production"
        }
    ]
    
    for project_data in projects:
        project = Project(**project_data)
        await db.projects.insert_one(project.dict())
    
    print(f"✓ Seeded {len(projects)} projects")


async def main():
    print("Starting database seeding...")
    await seed_admin()
    # await seed_projects()  # Disabled - no mock data needed
    print("\n✓ Database seeding complete!")
    client.close()


if __name__ == "__main__":
    asyncio.run(main())
