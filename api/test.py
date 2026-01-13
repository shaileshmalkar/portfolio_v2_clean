# Simple test endpoint to verify Vercel Python functions work
from fastapi import FastAPI
from mangum import Mangum

app = FastAPI()

@app.get("/")
def test():
    return {"status": "ok", "message": "Test endpoint working"}

handler = Mangum(app, lifespan="off")

