# Vercel serverless function handler for FastAPI
from mangum import Mangum
import sys
import os

# Add backend directory to Python path
current_dir = os.path.dirname(os.path.abspath(__file__))
backend_dir = os.path.join(current_dir, '..', 'backend')
sys.path.insert(0, backend_dir)

# Import the FastAPI app from backend
from main import app

# Create ASGI handler for Vercel serverless functions
handler = Mangum(app, lifespan="off")
