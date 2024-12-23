from fastapi import APIRouter
from models.report_models.go_no_go_model import go_no_go_request
from resources.report_gen.IMS_reports.go_no_go.report import ReportGeneration

router = APIRouter()

@router.post('/create-go-no-go-report/')
async def create_go_no_go_report(go_no_go_request: go_no_go_request, project_title: str):
    report_generator = ReportGeneration()
    return report_generator.generate_report(go_no_go_request, project_title)

@router.post('/delete-go-no-go-report/')
async def delete_go_no_go_report(name: str):
    report_generator = ReportGeneration()
    return report_generator.delete_report(name)