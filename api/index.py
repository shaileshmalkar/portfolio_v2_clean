# Vercel serverless function handler for FastAPI
import sys
import os

# Get the absolute path to the backend directory
# In Vercel, the file structure is: /var/task/api/index.py
# Backend should be at: /var/task/backend/main.py
current_file = os.path.abspath(__file__)
api_dir = os.path.dirname(current_file)
project_root = os.path.dirname(api_dir)
backend_dir = os.path.join(project_root, 'backend')

# Add backend to Python path
if backend_dir not in sys.path:
    sys.path.insert(0, backend_dir)

# Also add project root in case of relative imports
if project_root not in sys.path:
    sys.path.insert(0, project_root)

try:
    from mangum import Mangum
    from main import app
    
    # Create ASGI handler for Vercel
    handler = Mangum(app, lifespan="off")
    
except Exception as e:
    # If there's an error, create a simple error handler
    from fastapi import FastAPI
    from fastapi.responses import JSONResponse
    from mangum import Mangum
    
    error_app = FastAPI()
    
    @error_app.get("/{path:path}")
    @error_app.post("/{path:path}")
    def error_handler(path: str):
        import traceback
        return JSONResponse(
            status_code=500,
            content={
                "error": "Handler initialization failed",
                "message": str(e),
                "path": path,
                "backend_dir": backend_dir,
                "backend_exists": os.path.exists(backend_dir),
                "traceback": traceback.format_exc()[:500]  # Limit traceback length
            }
        )
    
    handler = Mangum(error_app, lifespan="off")
