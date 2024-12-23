from office365.sharepoint.client_context import ClientContext
from config.settings import SharePointConfig
from fastapi import HTTPException

class SharePointService:
    @staticmethod
    def get_sharepoint_context():
        config = SharePointConfig()
        return ClientContext(config.sharepoint_url).with_credentials(config.client_credentials)

    @staticmethod
    def create_sharepoint_folder(ctx: ClientContext, folder_path: str) -> bool:
        try:
            folder = ctx.web.ensure_folder_path(folder_path)
            ctx.execute_query()
            return True
        except Exception as e:
            return False

    @staticmethod
    def delete_sharepoint_folder(ctx: ClientContext, folder_path: str) -> bool:
        try:
            folder = ctx.web.get_folder_by_server_relative_url(folder_path)
            folder.delete_object()
            ctx.execute_query()
            return True
        except Exception as e:
            print(f"Error deleting folder: {e}")
            return False

    @staticmethod
    def create_directory_structure(job_title: str) -> dict:
        try:
            config = SharePointConfig()
            ctx = SharePointService.get_sharepoint_context()
            
            subdirectories1 = [
                '_QA',
                '1-ADMIN',
                '2-WORKING',
                '3-INCOMING',
                '4-OUTGOING'
            ]

            subdirectories2 = {
                '1-FEE PROPOSAL':{
                    '1-INCOMING RFQ': {},
                    '2-OUTGOING TENDER DOCS': {},
                    '3-CONTRACT': {},
                    '4-VARIATIONS': {},
                },
                '2-CONTRACTORS':{},
                '3-OPERATIONS':{
                    '1-PROGRAM': {},
                    '2-MEETINGS': {},
                },
                '4-DESIGN':{},
                '5-BIM':{
                    '1-INCOMING MODELS': {},
                    '2-REVIT MODELS': {},
                    '3-POINT CLOUDS': {},
                },
                '6-MARKUPS':{
                    '1-INCOMING MARKUPS': {},
                    '2-INTERNAL MARKUPS': {},
                    '3-OUTGOING MARKUPS': {},
                },
                '7-DRAWINGS':{
                    '1-INCOMING DRAWINGS': {},
                    '3-OUTGOING DRAWINGS': {},
                },
                '8-SITE':{
                    '1-PHOTOS': {},
                    '2-SWMS': {},
                    '3-PRESTART': {},
                    '4-MENTAL HEALTH': {},
                },
                '9-REPORTS':{},
                'A-IMS':{
                    'Completed QA Forms': {},
                }
            }

            created_dirs = []
            base_path = f"{config.base_folder}/{job_title}"

            # Create main job folder
            if SharePointService.create_sharepoint_folder(ctx, base_path):
                created_dirs.append(base_path)

            # Recursive function to create nested folders
            def create_nested_folders(current_path: str, structure: dict):
                for folder_name, subfolders in structure.items():
                    folder_path = f"{current_path}/{folder_name}"
                    if SharePointService.create_sharepoint_folder(ctx, folder_path):
                        created_dirs.append(folder_path)
                        if subfolders:  # If there are subfolders, create them recursively
                            create_nested_folders(folder_path, subfolders)
            
            # Create all folders and subfolders
            create_nested_folders(base_path, subdirectories2)

            if not created_dirs:
                raise HTTPException(
                    status_code=500,
                    detail="Failed to create any directories in SharePoint"
                )
            
            return {
                    "status": "success",
                    "message": f"SharePoint directory structure created for {job_title}",
                    "created_directories": created_dirs
            }
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))

    @staticmethod
    def delete_directory_structure(job_title: str) -> dict:
        try:
            config = SharePointConfig()
            ctx = SharePointService.get_sharepoint_context()
            
            base_path = f"{config.base_folder}/{job_title}"
            
            # Delete the main folder (this will delete all subdirectories as well)
            if SharePointService.delete_sharepoint_folder(ctx, base_path):
                return {
                    "status": "success",
                    "message": f"Successfully deleted SharePoint directory structure for {job_title}"
                }
            else:
                raise HTTPException(
                    status_code=500,
                    detail=f"Failed to delete directory structure for {job_title}"
                )
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))