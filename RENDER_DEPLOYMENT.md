# Render Deployment Guide

This guide will help you deploy your portfolio project to Render (Free Tier).

## 📋 Prerequisites

1. **GitHub Account** - Your code must be in a GitHub repository
2. **Render Account** - Sign up at [render.com](https://render.com) (free)
3. **MongoDB Atlas Account** - You already have this set up

## 🚀 Deployment Steps

### Step 1: Prepare Your Repository

1. **Push your code to GitHub** (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit for deployment"
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

### Step 2: Deploy Backend (FastAPI)

1. **Go to Render Dashboard**: https://dashboard.render.com

2. **Create New Web Service**:
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Configure the service:

3. **Backend Configuration**:
   ```
   Name: portfolio-backend (or any name you prefer)
   Region: Singapore (best for India)
   Branch: main
   Root Directory: (leave empty)
   Runtime: Python 3
   Build Command: pip install -r src/backend/requirements.txt
   Start Command: cd src/backend && uvicorn server:app --host 0.0.0.0 --port $PORT
   Plan: Free
   ```

4. **Environment Variables** (Click "Add Environment Variable"):
   ```
   MONGO_URL = mongodb+srv://devashishsurveofficial_db_user:O9mIFQKfVuizeTmZ@personalportfolio.xxv2jhs.mongodb.net/portfolio_db?retryWrites=true&w=majority&appName=personalPortfolio
   DB_NAME = portfolio_db
   SECRET_KEY = (generate a random string or use Render's auto-generate)
   ALGORITHM = HS256
   ACCESS_TOKEN_EXPIRE_MINUTES = 43200
   HOST = 0.0.0.0
   ```

5. **Click "Create Web Service"** - Wait 3-5 minutes for deployment

6. **Copy Backend URL**: After deployment, you'll get a URL like:
   ```
   https://portfolio-backend-xxxx.onrender.com
   ```

### Step 3: Deploy Frontend (React + Vite)

1. **Create New Static Site**:
   - Click "New +" → "Static Site"
   - Select the same GitHub repository

2. **Frontend Configuration**:
   ```
   Name: portfolio-frontend (or any name)
   Region: Singapore
   Branch: main
   Root Directory: (leave empty)
   Build Command: npm install && npm run build
   Publish Directory: dist
   ```

3. **Environment Variables**:
   ```
   VITE_BACKEND_URL = https://YOUR-BACKEND-URL.onrender.com
   ```
   (Replace with your actual backend URL from Step 2)

4. **Click "Create Static Site"** - Wait 3-5 minutes

5. **Your Portfolio is Live!** 🎉
   ```
   Frontend URL: https://portfolio-frontend-xxxx.onrender.com
   Backend URL: https://portfolio-backend-xxxx.onrender.com
   ```

## 🔧 Alternative: Using render.yaml (Blueprint)

Render supports infrastructure-as-code using `render.yaml`. The file is already created in your project root.

1. **Go to Render Dashboard** → "Blueprints"
2. **Click "New Blueprint Instance"**
3. **Connect your GitHub repo**
4. **Render will automatically detect** `render.yaml` and set everything up
5. **Add environment variables**:
   - `MONGO_URL` (from your existing .env)
   - Other variables are auto-configured

## 📝 Important Notes

### Free Tier Limitations:
- ⏱️ **Backend sleeps after 15 minutes** of inactivity
- 🐌 **First request after sleep takes ~30 seconds** to wake up
- 💾 **512 MB RAM limit** per service
- 🔄 **Automatic deploys** on git push

### Security:
- ⚠️ **Change admin password** after first login (default: admin/admin123)
- 🔑 **Never commit .env files** to GitHub
- 🔐 Use Render's environment variables for secrets

### CORS Configuration:
Your backend already allows all origins (`allow_origins=["*"]`). For production, update [server.py](c:\Users\devsurve\Desktop\portfolio\devashish\src\backend\server.py#L50-L55) to only allow your frontend domain:

```python
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=[
        "https://your-frontend-url.onrender.com",
        "http://localhost:5173"  # Keep for local dev
    ],
    allow_methods=["*"],
    allow_headers=["*"],
)
```

## 🐛 Troubleshooting

### Backend Issues:
1. **Check Render Logs**: Dashboard → Your Service → Logs
2. **Common Issues**:
   - Missing environment variables
   - MongoDB connection timeout (check MONGO_URL)
   - Wrong Python version (should be 3.10+)

### Frontend Issues:
1. **API not connecting**: Verify `VITE_BACKEND_URL` is correct
2. **Build fails**: Check Node version (should be 18+)
3. **404 on refresh**: Render handles this automatically for SPAs

### Wake-up Time:
If your backend is sleeping:
- First request will take 30-60 seconds
- Consider upgrading to paid plan ($7/month) for always-on service

## 💰 Cost Breakdown

**Free Tier (Current Setup):**
- Backend: $0/month (with sleep after inactivity)
- Frontend: $0/month
- MongoDB: $0/month (Atlas free tier)
- **Total: $0/month** ✅

**Upgrade Options:**
- Starter Plan: ₹600/month (~$7) - Always on, no sleep
- Standard Plan: ₹2000/month (~$25) - Better resources

## 🔄 Auto-Deployment

Once connected to GitHub:
1. **Push to main branch** → Automatic deployment
2. **Check deployment status** in Render Dashboard
3. **View logs** for any errors

## 📞 Support

- Render Docs: https://render.com/docs
- Your Backend URL: https://portfolio-backend-xxxx.onrender.com/docs
- MongoDB Atlas: https://cloud.mongodb.com

## ✅ Post-Deployment Checklist

- [ ] Backend is accessible at `/api/health`
- [ ] Frontend loads correctly
- [ ] Admin login works
- [ ] Projects display properly
- [ ] Contact form submission works
- [ ] Changed default admin password
- [ ] Added custom domain (optional)
- [ ] Updated CORS settings for production

---

**Ready to Deploy?** Follow the steps above and your portfolio will be live in ~10 minutes! 🚀
