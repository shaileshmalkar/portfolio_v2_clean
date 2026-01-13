# Vercel serverless function handler for FastAPI
from mangum import Mangum
import sys
import os

# Add backend directory to Python path
current_dir = os.path.dirname(os.path.abspath(__file__))
backend_dir = os.path.join(current_dir, '..', 'backend')
backend_dir = os.path.normpath(backend_dir)

if backend_dir not in sys.path:
    sys.path.insert(0, backend_dir)

try:
    # Import the FastAPI app from backend
    from main import app
    
    # Create ASGI handler for Vercel serverless functions
    # Vercel routes /api/* to this handler
    # The FastAPI app has routes like /api/profile, /api/skills, etc.
    handler = Mangum(app, lifespan="off")
    
except ImportError as e:
    # If import fails, create a minimal error handler
    from fastapi import FastAPI
    from fastapi.responses import JSONResponse
    
    error_app = FastAPI()
    
    @error_app.get("/{path:path}")
    @error_app.post("/{path:path}")
    @error_app.put("/{path:path}")
    @error_app.delete("/{path:path}")
    def error_handler(path: str):
        return JSONResponse(
            status_code=500,
            content={
                "error": "Backend import failed",
                "message": str(e),
                "path": path,
                "backend_dir": backend_dir,
                "backend_exists": os.path.exists(backend_dir),
                "sys_path": sys.path[:3]  # First 3 paths for debugging
            }
        )
    
    handler = Mangum(error_app, lifespan="off")
    
except Exception as e:
    # Catch any other errors
    from fastapi import FastAPI
    from fastapi.responses import JSONResponse
    
    error_app = FastAPI()
    
    @error_app.get("/{path:path}")
    def error_handler(path: str):
        import traceback
        return JSONResponse(
            status_code=500,
            content={
                "error": "Handler setup failed",
                "message": str(e),
                "path": path,
                "traceback": traceback.format_exc()
            }
        )
    
    handler = Mangum(error_app, lifespan="off")
