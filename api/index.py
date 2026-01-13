# Vercel serverless function handler for FastAPI
from mangum import Mangum
import sys
import os
import logging

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

try:
    # Add backend directory to Python path
    current_dir = os.path.dirname(os.path.abspath(__file__))
    backend_dir = os.path.join(current_dir, '..', 'backend')
    
    logger.info(f"Current directory: {current_dir}")
    logger.info(f"Backend directory: {backend_dir}")
    logger.info(f"Backend exists: {os.path.exists(backend_dir)}")
    
    if backend_dir not in sys.path:
        sys.path.insert(0, backend_dir)
    
    logger.info(f"Python path: {sys.path}")
    
    # Import the FastAPI app from backend
    from main import app
    logger.info("Successfully imported FastAPI app")
    
    # Create ASGI handler for Vercel serverless functions
    handler = Mangum(app, lifespan="off")
    logger.info("Mangum handler created successfully")
    
except Exception as e:
    logger.error(f"Error setting up handler: {str(e)}", exc_info=True)
    # Fallback handler
    from fastapi import FastAPI
    app = FastAPI()
    
    @app.get("/{path:path}")
    def catch_all(path: str):
        import traceback
        return {
            "error": "Failed to load backend",
            "message": str(e),
            "path": path,
            "traceback": traceback.format_exc()
        }
    
    handler = Mangum(app, lifespan="off")
