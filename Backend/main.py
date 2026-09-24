from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="Virtual STEM Lab API",
    description="Backend API for Virtual STEM Lab Platform",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {"message": "Virtual STEM Lab Backend is running!"}


@app.get("/health")
def health():
    return {"status": "healthy"}


@app.get("/api/ohms-law")
def calculate_ohms_law(voltage: float, resistance: float):
    if resistance <= 0:
        return {"error": "Resistance must be greater than 0"}

    current = voltage / resistance

    return {
        "voltage": voltage,
        "resistance": resistance,
        "current": round(current, 4),
    }