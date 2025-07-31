from pydantic import BaseModel

class RubricInsertResponse(BaseModel):
    status: bool
    reason: str

class FetchRubricResponse(BaseModel):
    rubric: tuple

class SingleRubricInsertRequest(BaseModel):
    name: str
    description: str
    domain: str
    sub_domain: str
    scenario: str
    weight: int = 1
    created_by: str
    is_public: int
    usage_count: int = 0

class FetchRubricRequest(BaseModel):
    id: int

class FetchRecentRubricsRequest(BaseModel):
    num_rubrics: int

class FetchRecentRubricsResponse(BaseModel):
    rubrics: list[tuple]