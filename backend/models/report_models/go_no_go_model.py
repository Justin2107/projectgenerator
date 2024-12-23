from pydantic import BaseModel

class go_no_go_request(BaseModel):
    project_name: str
    project_address: str
    job_type:str
