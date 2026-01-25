@echo off
REM Test deployment setup locally before pushing to Render

echo ========================================
echo Testing Portfolio Deployment Setup
echo ========================================
echo.

REM Check if .env files exist
echo [1/5] Checking environment files...
if exist "src\backend\.env" (
    echo    ✓ Backend .env found
) else (
    echo    ✗ Backend .env not found!
    echo    Create src\backend\.env with your MongoDB connection
    exit /b 1
)

REM Check Python dependencies
echo.
echo [2/5] Checking Python dependencies...
cd src\backend
python -m pip install -r requirements.txt >nul 2>&1
if errorlevel 1 (
    echo    ✗ Failed to install Python dependencies
    exit /b 1
) else (
    echo    ✓ Python dependencies OK
)

REM Test MongoDB connection
echo.
echo [3/5] Testing MongoDB connection...
python test_connection.py
if errorlevel 1 (
    echo    ✗ MongoDB connection failed
    echo    Check your MONGO_URL in .env
    cd ..\..
    exit /b 1
)

cd ..\..

REM Check Node dependencies
echo.
echo [4/5] Checking Node.js dependencies...
call npm install >nul 2>&1
if errorlevel 1 (
    echo    ✗ Failed to install Node dependencies
    exit /b 1
) else (
    echo    ✓ Node.js dependencies OK
)

REM Test frontend build
echo.
echo [5/5] Testing frontend build...
call npm run build >nul 2>&1
if errorlevel 1 (
    echo    ✗ Frontend build failed
    exit /b 1
) else (
    echo    ✓ Frontend build successful
)

echo.
echo ========================================
echo ✓ All checks passed!
echo ========================================
echo.
echo Your project is ready for deployment to Render!
echo.
echo Next steps:
echo 1. Push to GitHub: git push origin main
echo 2. Go to: https://dashboard.render.com
echo 3. Follow: DEPLOY_CHECKLIST.md
echo.
pause
