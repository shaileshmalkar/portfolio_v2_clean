# Vercel serverless function handler for FastAPI - catch-all for other API routes
from mangum import Mangum
import sys
import os

# Add backend directory to Python path
current_dir = os.path.dirname(os.path.abspath(__file__))
backend_dir = os.path.join(current_dir, '..', 'backend')
if backend_dir not in sys.path:
    sys.path.insert(0, backend_dir)

try:
    # Import the FastAPI app from backend
    from main import app
    
    # Create ASGI handler for Vercel serverless functions
    handler = Mangum(app, lifespan="off")
except Exception as e:
    # Fallback handler if import fails
    from fastapi import FastAPI
    app = FastAPI()
    
    @app.get("/{path:path}")
    def catch_all(path: str):
        return {"error": f"Failed to load backend: {str(e)}", "path": path}
    
    handler = Mangum(app, lifespan="off")
