@echo off
REM Backend Server Startup Script for Windows
REM This script starts the FastAPI backend server

echo ====================================
echo Starting Portfolio Backend Server
echo ====================================
echo.

cd /d "%~dp0src\backend"

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Python is not installed or not in PATH
    echo Please install Python 3.10 or higher
    pause
    exit /b 1
)

echo Checking Python dependencies...
python -m pip install -r requirements.txt --quiet

echo.
echo Starting server on http://localhost:8000
echo API Documentation: http://localhost:8000/docs
echo.
echo Press CTRL+C to stop the server
echo.

python -m uvicorn server:app --reload --host 0.0.0.0 --port 8000

pause
