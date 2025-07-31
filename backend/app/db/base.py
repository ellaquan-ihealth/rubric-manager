import mysql.connector

def insert_one_to_table(host, username, password, database, sql, val):
    try:
        sql_connector = mysql.connector.connect(
            host=host,
            user=username,
            password=password,
            database=database
        )
    except Exception as e:
        raise Exception(f"Failed to open connection to mysql database: {e}")
    
    try:
        cursor = sql_connector.cursor()
        cursor.execute(sql, val)
        
        sql_connector.commit()
    except Exception as e:
        raise Exception(f"Failed to execute SQL command: {e}")

def insert_many_to_table(host, username, password, database, sql, val):
    try:
        sql_connector = mysql.connector.connect(
            host=host,
            user=username,
            password=password,
            database=database
        )
    except Exception as e:
        raise Exception(f"Failed to open connection to mysql database: {e}")
    
    try:
        cursor = sql_connector.cursor()
        cursor.executemany(sql, val)
        
        sql_connector.commit()
    except Exception as e:
        raise Exception(f"Failed to execute SQL command: {e}")

def fetch_rubric_from_id(host, username, password, database, id):
    try:
        sql_connector = mysql.connector.connect(
            host=host,
            user=username,
            password=password,
            database=database
        )
    except Exception as e:
        raise Exception(f"Failed to open connection to mysql database: {e}")
    
    try:
        sql = "SELECT * FROM rubrics WHERE id = %s"
        
        cursor = sql_connector.cursor()
        cursor.execute(sql, [id])
        
        result = cursor.fetchone()
        return result
    
    except Exception as e:
        raise Exception(f"Failed to execute SQL command: {e}")

def fetch_most_recent_rubrics(host, username, password, database, num_rubrics):
    try:
        sql_connector = mysql.connector.connect(
            host=host,
            user=username,
            password=password,
            database=database
        )
    except Exception as e:
        raise Exception(f"Failed to open connection to mysql database: {e}")
    
    try:
        sql = "SELECT * FROM rubrics ORDER BY created_at DESC LIMIT %s"
        val = [num_rubrics]
        
        cursor = sql_connector.cursor()
        cursor.execute(sql, val)
        
        result = cursor.fetchall()
        return result
    
    except Exception as e:
        raise Exception(f"Failed to execute SQL command: {e}")