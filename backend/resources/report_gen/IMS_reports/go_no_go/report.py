from pathlib import Path
from docxtpl import DocxTemplate
from io import BytesIO
from office365.sharepoint.files.file import File
from config.settings import SharePointConfig
from services.sharepoint_service import SharePointService
from fastapi import HTTPException

class ReportGeneration():
    def __init__(self):
        self.template_path = Path(__file__).parent / 'template.docx'
        self.doc = DocxTemplate(self.template_path)
    
    def generate_report(self, data, project_title):
        context = self.update_fields(data)
        self.doc.render(context)
        
        # Save to BytesIO
        buffer = BytesIO()
        self.doc.save(buffer)
        buffer.seek(0)
        
        # Get SharePoint context
        ctx = SharePointService.get_sharepoint_context()
        config = SharePointConfig()
        
        # Make sure the path uses forward slashes
        relative_url = f"{config.base_folder}/{project_title}/A-IMS/".replace('\\', '/')
        
        try:
            # Try using upload_file instead of save_binary
            target_folder = ctx.web.get_folder_by_server_relative_url(relative_url)
            target_folder.upload_file("report.docx", buffer.getvalue()).execute_query()
            
            return {"status": "success", "message": "Report saved to SharePoint"}
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Failed to save report: {str(e)}")
        
    def delete_report(self, report_name: str):
        try:
            ctx = SharePointService.get_sharepoint_context()
            config = SharePointConfig()

            relative_url = f"{config.base_folder}/{report_name}.docx".replace('\\', '/')

            file = ctx.web.get_file_by_server_relative_url(relative_url)
            file.delete_object().execute_query()

            return {
                "status": "success",
                "message": f"File {report_name} deleted successfully"
            }
        except Exception as e:
            raise HTTPException(
                status_code=500,
                detail=f"Failed to delete file {report_name}: {str(e)}"
            )
    
    def update_fields(self, data):
        context = {
            'project_name': data.project_name,
            'project_address': data.project_address,
            'job_type': data.job_type,
        }
        return context