from mangum import Mangum
import sys
import os

# Add backend to path
backend_dir = os.path.join(os.path.dirname(__file__), '..', 'backend')
sys.path.insert(0, backend_dir)

from main import app

# Handler for /api/profile
handler = Mangum(app, lifespan="off")

