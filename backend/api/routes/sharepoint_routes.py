from fastapi import APIRouter
from models.sharepoint_models import JobRequest
from services.sharepoint_service import SharePointService

router = APIRouter()

@router.post('/create-directories/')
async def create_directories(job_request: JobRequest):
    return SharePointService.create_directory_structure(job_request.job_title)

@router.post('/delete-directory/')
async def delete_directory(job_request: JobRequest):
    return SharePointService.delete_directory_structure(job_request.job_title)