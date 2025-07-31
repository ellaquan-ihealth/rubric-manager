from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from db.base import insert_one_to_table, fetch_rubric_from_id, fetch_most_recent_rubrics
from schemas.schema import RubricInsertResponse, SingleRubricInsertRequest, FetchRubricResponse, FetchRubricRequest, FetchRecentRubricsRequest, FetchRecentRubricsResponse

app = FastAPI(title="rubric manager backend")

# add origins for frontend, otherwise FE can't call APIs
origins = [
    "http://localhost:3000"
    # "*"
]

# Enable CORS for local development
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def main():
    return "yoho"

@app.post("/insert_one_to_table", response_model=RubricInsertResponse)
def insert_one(insert_request: SingleRubricInsertRequest):
    sql = "INSERT INTO RUBRICS (name, description, domain, sub_domain, scenario, weight, created_by, is_public, usage_count) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)"
    val = [insert_request.name, insert_request.description, insert_request.domain, insert_request.sub_domain, insert_request.scenario, insert_request.weight, insert_request.created_by, insert_request.is_public, insert_request.usage_count]
    try:
        insert_one_to_table(host="localhost", username="root", password="", database="test", sql=sql, val=val)
        return {"status": True, "reason": "good job 👍"}
    except Exception as e:
        return {"status": False, "reason": e}

@app.post("/fetch_rubric_from_id", response_model=FetchRubricResponse)
def fetch_rubric(fetch_request: FetchRubricRequest):
    try:
        rubric = fetch_rubric_from_id(host="localhost", username="root", password="", database="test", id=fetch_request.id)
        return {"rubric": rubric}
    except Exception as e:
        return {"rubric": (e)}
    
@app.post("/fetch_recent_rubrics", response_model=FetchRecentRubricsResponse)
def fetch_recent_rubrics(fetch_request: FetchRecentRubricsRequest):
    try:
        rubrics = fetch_most_recent_rubrics(host="localhost", username="root", password="", database="test", num_rubrics=fetch_request.num_rubrics)
        return {"rubrics": rubrics}
    except Exception as e:
        return {"rubrics": [(e)]}