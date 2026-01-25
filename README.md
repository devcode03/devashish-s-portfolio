# Developer Portfolio - Terminal Theme 🚀

A modern, professional portfolio website with a terminal-inspired design. Features a full-stack application with React frontend, FastAPI backend, and MongoDB database.

## ✨ Features

- 🎨 Terminal-themed UI with Matrix-style animations
- 📱 Fully responsive design
- 🔐 Admin dashboard for content management
- 📊 Project showcase with filtering
- 📧 Contact form with database storage
- 🎯 JWT-based authentication
- ⚡ Fast and modern tech stack

## 🛠️ Tech Stack

**Frontend:**
- React 19 + Vite
- Tailwind CSS
- shadcn/ui components
- React Router v7
- Axios

**Backend:**
- FastAPI (Python)
- MongoDB (Motor async driver)
- JWT authentication
- Uvicorn server

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- Python 3.10+
- MongoDB Atlas account

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd devashish
   ```

2. **Install dependencies**
   ```bash
   npm install
   npm run backend:install
   ```

3. **Setup environment variables**
   
   Create `src/backend/.env`:
   ```env
   MONGO_URL=your_mongodb_connection_string
   DB_NAME=portfolio_db
   SECRET_KEY=your-secret-key
   ALGORITHM=HS256
   ACCESS_TOKEN_EXPIRE_MINUTES=43200
   ```

4. **Start development servers**
   ```bash
   # Option 1: Start both frontend and backend
   npm run start:all

   # Option 2: Start separately
   npm run dev         # Frontend (http://localhost:5173)
   npm run backend     # Backend (http://localhost:8000)
   ```

5. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:8000/api
   - API Docs: http://localhost:8000/docs
   - Admin Login: admin / admin123 (change immediately!)

## 📦 Deployment

### Deploy to Render (Free Tier) - Recommended ⭐

1. **Quick Deploy** - Follow [DEPLOY_CHECKLIST.md](./DEPLOY_CHECKLIST.md) (10 minutes)
2. **Full Guide** - See [RENDER_DEPLOYMENT.md](./RENDER_DEPLOYMENT.md)
3. **Setup Summary** - Read [DEPLOYMENT_SETUP.md](./DEPLOYMENT_SETUP.md)

**Cost:** ₹0/month (Free tier with MongoDB Atlas)

### Test Before Deploy
```bash
# Windows
test_deployment.bat

# Mac/Linux
chmod +x test_deployment.sh
./test_deployment.sh
```

## 📁 Project Structure

```
├── src/
│   ├── backend/           # FastAPI backend
│   │   ├── server.py      # Main application
│   │   ├── auth.py        # JWT authentication
│   │   ├── models.py      # Pydantic models
│   │   └── routes/        # API endpoints
│   ├── components/        # React components
│   ├── pages/            # Page components
│   ├── services/         # API services
│   └── main.jsx          # React entry point
├── render.yaml           # Render deployment config
└── package.json          # Dependencies
```

## 🔐 Admin Features

- Login at `/admin`
- Manage projects (CRUD operations)
- View contact form submissions
- Update project status and details

## 📚 Documentation

- [Backend Setup Guide](./src/backend/README.md)
- [Deployment Guide](./RENDER_DEPLOYMENT.md)
- [Quick Deploy Checklist](./DEPLOY_CHECKLIST.md)
- [Full Portfolio Guide](./PORTFOLIO_README.md)

## 🐛 Troubleshooting

**Backend won't start?**
- Check MongoDB connection string in `.env`
- Verify Python dependencies: `npm run backend:install`

**Frontend can't connect?**
- Ensure backend is running on port 8000
- Check `VITE_BACKEND_URL` in `.env`

**Build fails?**
- Clear cache: `rm -rf node_modules dist && npm install`
- Rebuild: `npm run build`

## 🤝 Contributing

Feel free to fork and customize for your own portfolio!

## 📄 License

MIT License - feel free to use for your own portfolio

## 🙏 Acknowledgments

- Built with React, FastAPI, and MongoDB
- UI components from shadcn/ui
- Icons from Lucide React

---

**Ready to deploy?** Start with [DEPLOY_CHECKLIST.md](./DEPLOY_CHECKLIST.md) 🚀
