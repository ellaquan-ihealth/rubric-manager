from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from db.base import MySQLDriver
from schemas import schema

app = FastAPI(title="rubric manager backend")

# add origins for frontend, otherwise FE can't call APIs
# origins = [
#     "http://localhost:8081",
#     "http://localhost:3000", # next
#     "http://localhost:8080" # vite
# ]

origins = [
    "*" # just for development, replace with actual origin when deploying
]

# Enable CORS for local development
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

MySQLClient = MySQLDriver(
    host="localhost",
    username="root",
    password="",
    database="test"
)

@app.get("/")
def main():
    return "yoho"

@app.post("/insert_one_to_table", response_model=schema.InsertRubricResponse)
def insert_one(insert_request: schema.InsertRubricRequest):
    val = [insert_request.name, insert_request.description, insert_request.domain, insert_request.sub_domain, insert_request.scenario, insert_request.weight, insert_request.created_by, insert_request.is_public, insert_request.usage_count]
    headers = ("name", "description", "domain", "sub_domain", "scenario", "weight", "created_by", "is_public", "usage_count")
    
    try:
        MySQLClient.insert_one(table="rubrics", headers=headers, val=val)
        return {"status": True, "reason": "good job 👍"}
    except Exception as e:
        return {"status": False, "reason": e}

@app.post("/update_rubric_by_id", response_model=schema.UpdateRubricByIdResponse)
def update_rubric(update_request: schema.UpdateRubricByIdRequest):
    try:
        MySQLClient.update_by_id(table="rubrics", id=update_request.id, update=update_request.update)
        return {"status": True}
    
    except Exception as e:
        return {"status": False}

@app.post("/fetch_rubric_from_id", response_model=schema.FetchRubricResponse)
def fetch_rubric(fetch_request: schema.FetchRubricRequest):
    try:
        rubric = MySQLClient.fetch_one(table="rubrics", filters=[f"id = {fetch_request.id}"])
        return {"rubric": rubric}
    except Exception as e:
        return {"rubric": (e)}
    
@app.post("/fetch_recent_rubrics", response_model=schema.FetchRecentRubricsResponse)
def fetch_recent_rubrics(fetch_request: schema.FetchRecentRubricsRequest):
    try:
        rubrics = MySQLClient.fetch_most_recent(table="rubrics", num_rubrics=fetch_request.num_rubrics)
        return {"rubrics": rubrics}
    except Exception as e:
        return {"rubrics": [(e)]}