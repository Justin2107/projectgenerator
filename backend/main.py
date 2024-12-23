from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.routes import sharepoint_routes, report_routes

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://127.0.0.1:3000", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(sharepoint_routes.router, prefix="/api/sharepoint", tags=["sharepoint"])
app.include_router(report_routes.router, prefix="/api/reports", tags=["reports"])

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)