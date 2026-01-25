# Backend Setup & Usage Guide

This is the FastAPI backend for the Developer Portfolio application, providing RESTful APIs for projects, contacts, and admin management with MongoDB integration.

## 🚀 Quick Start

### Prerequisites
- Python 3.10 or higher
- MongoDB Atlas account (or local MongoDB)
- pip (Python package manager)

### Installation

**Option 1: Using the startup script (Recommended)**
```bash
# Windows
start_backend.bat

# Mac/Linux
chmod +x start_backend.sh
./start_backend.sh
```

**Option 2: Using npm scripts**
```bash
# Install backend dependencies
npm run backend:install

# Start backend server
npm run backend

# Or start both frontend and backend together (requires concurrently package)
npm run start:all
```

**Option 3: Manual setup**
```bash
cd src/backend
python -m pip install -r requirements.txt
python -m uvicorn server:app --reload --host 0.0.0.0 --port 8000
```

## 📋 Environment Configuration

The backend requires a `.env` file in `src/backend/` directory:

```env
# MongoDB Configuration
MONGO_URL=your_mongodb_connection_string_here
DB_NAME=portfolio_db

# JWT Configuration
SECRET_KEY=your-secret-key-change-this-in-production
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=43200

# Server Configuration (Optional)
HOST=0.0.0.0
PORT=8000
```

### Getting MongoDB Connection String

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create a database user
4. Get your connection string (it looks like: `mongodb+srv://username:password@cluster.mongodb.net/`)
5. Add it to your `.env` file

## 🌐 API Endpoints

Once running, the server will be available at:
- **Base URL**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs (Interactive Swagger UI)
- **API Root**: http://localhost:8000/api
- **Health Check**: http://localhost:8000/api/health

### Main Endpoints

#### Projects API
- `GET /api/projects` - Get all projects (with optional filters)
- `GET /api/projects/{id}` - Get project by ID
- `POST /api/admin/projects` - Create new project (requires auth)
- `PUT /api/admin/projects/{id}` - Update project (requires auth)
- `DELETE /api/admin/projects/{id}` - Delete project (requires auth)

#### Contact API
- `POST /api/contact` - Submit contact form
- `GET /api/admin/contacts` - Get all contacts (requires auth)

#### Admin API
- `POST /api/admin/login` - Admin login
- `GET /api/admin/verify` - Verify admin token

## 🔐 Default Admin Credentials

On first startup, a default admin user is created:
- **Username**: `admin`
- **Password**: `admin123`

**⚠️ IMPORTANT**: Change these credentials immediately after first login!

## 📁 Project Structure

```
src/backend/
├── server.py           # Main FastAPI application
├── auth.py            # Authentication utilities
├── models.py          # Pydantic models
├── requirements.txt   # Python dependencies
├── .env              # Environment variables (create this)
├── .env.example      # Environment template
└── routes/
    ├── __init__.py
    ├── projects.py    # Project endpoints
    ├── contact.py     # Contact endpoints
    └── admin.py       # Admin endpoints
```

## 🛠️ Development

### Installing New Dependencies
```bash
cd src/backend
python -m pip install package_name
python -m pip freeze > requirements.txt
```

### Running Tests
```bash
cd src/backend
python test_connection.py  # Test MongoDB connection
```

### Database Seeding
```bash
cd src/backend
python seed_data.py  # Add sample data to database
```

## 🐛 Troubleshooting

### "pip is not recognized"
Use `python -m pip` instead of `pip`:
```bash
python -m pip install -r requirements.txt
```

### Cannot connect to MongoDB
1. Check your `MONGO_URL` in `.env`
2. Verify your MongoDB cluster is running
3. Check if your IP is whitelisted in MongoDB Atlas
4. Ensure your database user has correct permissions

### Port 8000 already in use
Change the port in `.env`:
```env
PORT=8001
```

### Module not found errors
Reinstall dependencies:
```bash
python -m pip install -r requirements.txt --force-reinstall
```

## 📝 Common Commands

```bash
# Start server with auto-reload (development)
python -m uvicorn server:app --reload

# Start server on specific host/port
python -m uvicorn server:app --host 0.0.0.0 --port 8000

# Start without auto-reload (production)
python -m uvicorn server:app --host 0.0.0.0 --port 8000 --workers 4

# View logs
# Logs are printed to console with timestamps
```

## 🔒 Security Notes

- Change default admin credentials immediately
- Use strong `SECRET_KEY` in production
- Enable HTTPS in production
- Restrict CORS origins in production
- Keep dependencies updated
- Never commit `.env` file to version control

## 📚 Additional Resources

- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [Uvicorn Documentation](https://www.uvicorn.org/)
- [Pydantic Documentation](https://docs.pydantic.dev/)

## 💡 Tips

- Use the interactive API docs at `/docs` to test endpoints
- Check server logs for detailed error messages
- The server auto-reloads on code changes in development mode
- Database indexes are created automatically on startup
- All API responses are in JSON format

---

**Need Help?** Check the main [README.md](../../README.md) or open an issue.
