import os
from dotenv import load_dotenv
from office365.runtime.auth.client_credential import ClientCredential

class SharePointConfig:
    def __init__(self):
        load_dotenv()
        self.sharepoint_url = os.getenv('SHAREPOINT_URL')
        self.base_folder = os.getenv('SHAREPOINT_BASE_FOLDER')
        self.client_credentials = ClientCredential(
            client_id=os.getenv('SHAREPOINT_CLIENT_ID'),
            client_secret=os.getenv('SHAREPOINT_CLIENT_SECRET')
        )