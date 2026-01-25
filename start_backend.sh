#!/bin/bash
# Backend Server Startup Script for Mac/Linux
# This script starts the FastAPI backend server

echo "===================================="
echo "Starting Portfolio Backend Server"
echo "===================================="
echo ""

cd "$(dirname "$0")/src/backend"

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "ERROR: Python 3 is not installed"
    echo "Please install Python 3.10 or higher"
    exit 1
fi

echo "Checking Python dependencies..."
python3 -m pip install -r requirements.txt --quiet

echo ""
echo "Starting server on http://localhost:8000"
echo "API Documentation: http://localhost:8000/docs"
echo ""
echo "Press CTRL+C to stop the server"
echo ""

python3 -m uvicorn server:app --reload --host 0.0.0.0 --port 8000
