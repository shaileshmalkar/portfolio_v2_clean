# Vercel serverless function handler for FastAPI
import sys
import os

# Determine the correct paths
# In Vercel: /var/task/api/index.py
# Backend should be at: /var/task/backend/main.py
current_file = os.path.abspath(__file__)
api_dir = os.path.dirname(current_file)
project_root = os.path.dirname(api_dir)
backend_dir = os.path.join(project_root, 'backend')
backend_dir = os.path.normpath(backend_dir)

# Debug: Print paths (will show in Vercel logs)
print(f"Current file: {current_file}")
print(f"API dir: {api_dir}")
print(f"Project root: {project_root}")
print(f"Backend dir: {backend_dir}")
print(f"Backend exists: {os.path.exists(backend_dir)}")

# Add backend to Python path
if backend_dir not in sys.path:
    sys.path.insert(0, backend_dir)
    print(f"Added {backend_dir} to sys.path")

# Add project root
if project_root not in sys.path:
    sys.path.insert(0, project_root)

try:
    # Change to backend directory to ensure relative imports work
    original_cwd = os.getcwd()
    if os.path.exists(backend_dir):
        os.chdir(backend_dir)
        print(f"Changed working directory to: {backend_dir}")
    
    # Import FastAPI app
    from main import app
    print("Successfully imported FastAPI app")
    
    # Change back
    os.chdir(original_cwd)
    
    # Import Mangum after app is loaded
    from mangum import Mangum
    
    # Create handler
    handler = Mangum(app, lifespan="off")
    print("Mangum handler created successfully")
    
except Exception as e:
    import traceback
    error_details = traceback.format_exc()
    print(f"ERROR importing backend: {str(e)}")
    print(f"Traceback: {error_details}")
    
    # Create error handler
    from fastapi import FastAPI
    from fastapi.responses import JSONResponse
    from mangum import Mangum
    
    error_app = FastAPI()
    
    @error_app.get("/{path:path}")
    @error_app.post("/{path:path}")
    @error_app.put("/{path:path}")
    @error_app.delete("/{path:path}")
    def error_handler(path: str):
        return JSONResponse(
            status_code=500,
            content={
                "error": "Backend initialization failed",
                "message": str(e),
                "path": path,
                "backend_dir": backend_dir,
                "backend_exists": os.path.exists(backend_dir),
                "sys_path_preview": sys.path[:5],
                "traceback": error_details[:1000]
            }
        )
    
    handler = Mangum(error_app, lifespan="off")
