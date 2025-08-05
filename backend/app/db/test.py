# import mysql.connector
# from time import time

# # sql = "INSERT INTO RUBRICS (name, description, domain, sub_domain, scenario, weight, created_by, is_public, usage_count) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)"
# # val = ["test", "if", "DM", "Lifestyle", "Safety", "1", "16f7_DM_01", "0", "0"]

# # sql = "SELECT * FROM rubrics WHERE id = %s"
# # val = [38]

# # sql = "SELECT * FROM rubrics ORDER BY created_at DESC LIMIT %s"
# table = "rubrics"
# params = ("name", "description", "domain", "sub_domain", "scenario", "weight", "created_by", "is_public", "usage_count")

# sql = f"INSERT INTO {table} {tuple([param for param in params])} VALUES {tuple(['%s' for _ in range(len(params))])}".replace('"', '').replace("'", '')
# val = ["test", "if", "DM", "Lifestyle", "Safety", "1", "16f7_DM_01", "0", "0"]

from base import MySQLDriver

mydb = MySQLDriver("localhost", "root", "", "test")

table = "rubrics"
params = ("name", "description", "domain", "sub_domain", "scenario", "weight", "created_by", "is_public", "usage_count")
vals = [["test", "if", "DM", "Lifestyle", "Safety", "1", "16f7_DM_01", "0", "0"] for x in range(5)]

filters = ["Domain IN ('DM', 'ASDF')", "Name = 'test'", "id = 50"]

# fetched_rubric = mydb.fetch_multiple(table, filters)
# fetched_rubrics = mydb.fetch_most_recent(table)
# print(fetched_rubrics)
mydb.update_by_id(table, 78, {"name": "not a test"})