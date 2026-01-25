# Render Deployment - Quick Setup Checklist

## 🚀 Quick Deploy Steps (10 minutes)

### ✅ Pre-Deployment Checklist
- [ ] Code pushed to GitHub
- [ ] MongoDB Atlas is running (already set up ✓)
- [ ] Render account created (free)

### 📦 Backend Deployment (5 minutes)

1. **Go to**: https://dashboard.render.com
2. **Click**: New + → Web Service
3. **Select**: Your GitHub repository
4. **Configure**:
   - Name: `portfolio-backend`
   - Region: `Singapore`
   - Build Command: `pip install -r src/backend/requirements.txt`
   - Start Command: `cd src/backend && uvicorn server:app --host 0.0.0.0 --port $PORT`
   
5. **Environment Variables** (click "Add Environment Variable"):
   ```
   MONGO_URL = mongodb+srv://devashishsurveofficial_db_user:O9mIFQKfVuizeTmZ@personalportfolio.xxv2jhs.mongodb.net/portfolio_db?retryWrites=true&w=majority&appName=personalPortfolio
   DB_NAME = portfolio_db
   SECRET_KEY = (auto-generate or use a random string)
   ALGORITHM = HS256
   ACCESS_TOKEN_EXPIRE_MINUTES = 43200
   ```

6. **Click**: Create Web Service
7. **Copy Backend URL**: e.g., `https://portfolio-backend-abc123.onrender.com`

### 🎨 Frontend Deployment (5 minutes)

1. **Go to**: https://dashboard.render.com
2. **Click**: New + → Static Site
3. **Select**: Same GitHub repository
4. **Configure**:
   - Name: `portfolio-frontend`
   - Region: `Singapore`
   - Build Command: `npm install && npm run build`
   - Publish Directory: `dist`
   
5. **Environment Variables**:
   ```
   VITE_BACKEND_URL = https://YOUR-BACKEND-URL.onrender.com
   ```
   (Use the URL from step 7 above)

6. **Click**: Create Static Site

### 🎉 Done!

Your portfolio is live at:
- **Frontend**: https://portfolio-frontend-abc123.onrender.com
- **Backend API**: https://portfolio-backend-abc123.onrender.com/api
- **API Docs**: https://portfolio-backend-abc123.onrender.com/docs

### ⚠️ Important Post-Deployment

1. **Login to admin panel** (default: admin/admin123)
2. **Change admin password immediately**
3. **Test all features**:
   - [ ] Projects load
   - [ ] Contact form works
   - [ ] Admin dashboard works

### 💡 Tips

- **First load takes 30-60 seconds** (free tier limitation)
- **Auto-deploys** on git push to main
- **Check logs** in Render Dashboard if issues occur

### 📖 Full Documentation

See [RENDER_DEPLOYMENT.md](./RENDER_DEPLOYMENT.md) for detailed instructions.

---

**Total Cost**: ₹0/month 🎯
