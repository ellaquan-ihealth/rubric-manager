import mysql.connector
from time import time

# sql = "INSERT INTO RUBRICS (name, description, domain, sub_domain, scenario, weight, created_by, is_public, usage_count) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)"
# val = ["test", "if", "DM", "Lifestyle", "Safety", "1", "16f7_DM_01", "0", "0"]

# sql = "SELECT * FROM rubrics WHERE id = %s"
# val = [38]

sql = "SELECT * FROM rubrics ORDER BY created_at DESC LIMIT %s"
val = [10]

try:
    start_time = time()
    mydb = mysql.connector.connect(
        host="localhost",
        user="root",
        password="",
        database="test"
    )
    cursor = mydb.cursor()
    cursor.execute(sql, val)
    
    result = cursor.fetchall()
    
    print(result)
    
    print(time()-start_time)
except Exception as e:
    print(e)