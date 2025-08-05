from pydantic import BaseModel

# inserts
class InsertRubricRequest(BaseModel):
    name: str
    description: str
    domain: str
    sub_domain: str
    scenario: str
    weight: int = 1
    created_by: str
    is_public: int
    usage_count: int = 0

class InsertRubricResponse(BaseModel):
    status: bool
    reason: str

# updates
class UpdateRubricByIdRequest(BaseModel):
    id: int
    update: dict

class UpdateRubricByIdResponse(BaseModel):
    status: bool

# retrievals
class FetchRubricRequest(BaseModel):
    id: int
    
class FetchRubricResponse(BaseModel):
    rubric: tuple

class FetchRecentRubricsRequest(BaseModel):
    num_rubrics: int

class FetchRecentRubricsResponse(BaseModel):
    rubrics: list[tuple]