#!/bin/bash
# Test deployment setup locally before pushing to Render

echo "========================================"
echo "Testing Portfolio Deployment Setup"
echo "========================================"
echo ""

# Check if .env files exist
echo "[1/5] Checking environment files..."
if [ -f "src/backend/.env" ]; then
    echo "   ✓ Backend .env found"
else
    echo "   ✗ Backend .env not found!"
    echo "   Create src/backend/.env with your MongoDB connection"
    exit 1
fi

# Check Python dependencies
echo ""
echo "[2/5] Checking Python dependencies..."
cd src/backend
python3 -m pip install -r requirements.txt > /dev/null 2>&1
if [ $? -eq 0 ]; then
    echo "   ✓ Python dependencies OK"
else
    echo "   ✗ Failed to install Python dependencies"
    exit 1
fi

# Test MongoDB connection
echo ""
echo "[3/5] Testing MongoDB connection..."
python3 test_connection.py
if [ $? -ne 0 ]; then
    echo "   ✗ MongoDB connection failed"
    echo "   Check your MONGO_URL in .env"
    cd ../..
    exit 1
fi

cd ../..

# Check Node dependencies
echo ""
echo "[4/5] Checking Node.js dependencies..."
npm install > /dev/null 2>&1
if [ $? -eq 0 ]; then
    echo "   ✓ Node.js dependencies OK"
else
    echo "   ✗ Failed to install Node dependencies"
    exit 1
fi

# Test frontend build
echo ""
echo "[5/5] Testing frontend build..."
npm run build > /dev/null 2>&1
if [ $? -eq 0 ]; then
    echo "   ✓ Frontend build successful"
else
    echo "   ✗ Frontend build failed"
    exit 1
fi

echo ""
echo "========================================"
echo "✓ All checks passed!"
echo "========================================"
echo ""
echo "Your project is ready for deployment to Render!"
echo ""
echo "Next steps:"
echo "1. Push to GitHub: git push origin main"
echo "2. Go to: https://dashboard.render.com"
echo "3. Follow: DEPLOY_CHECKLIST.md"
echo ""
