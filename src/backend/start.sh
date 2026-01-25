#!/bin/bash
# Start script for Render backend deployment

echo "Starting FastAPI server..."
uvicorn server:app --host 0.0.0.0 --port ${PORT:-8000}
