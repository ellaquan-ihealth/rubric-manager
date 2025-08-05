import mysql.connector

class MySQLDriver:
    def __init__(self, host, username, password, database):
        try:
            sql_connector = mysql.connector.connect(
                host=host,
                user=username,
                password=password,
                database=database
            )
            self.sql_connector = sql_connector
            
        except Exception as e:
            raise Exception(f"Failed to open connection to mysql database: {e}")

    def insert_one(self, table: str, headers: tuple, val: list):
        sql = f"INSERT INTO {table} {tuple([p for p in headers])} VALUES {tuple(['%s' for _ in range(len(headers))])}".replace('"', '').replace("'", '')
        self._execute_single_insert(sql, val)
    
    def insert_multiple(self, table: str, headers: tuple, val: list[list]):
        sql = f"INSERT INTO {table} {tuple([p for p in headers])} VALUES {tuple(['%s' for _ in range(len(headers))])}".replace('"', '').replace("'", '')
        self._execute_multiple_insert(sql, val)
    
    def fetch_one(self, table: str, filters: list[str] = []):
        if len(filters) > 0:
            sql = f"SELECT * FROM {table} WHERE "
            for i in range(len(filters)-1):
                sql += filters[i]
                sql += " AND "
            sql += filters[-1]
        else:
            print("fetching from mysql without any filters, THIS IS NOT RECOMMENDED")
            sql = f"SELECT * FROM {table}"
        
        return self._execute_single_fetch(sql)

    def fetch_multiple(self, table: str, filters: list[str] = []):
        if len(filters) > 0:
            sql = f"SELECT * FROM {table} WHERE "
            for i in range(len(filters)-1):
                sql += filters[i]
                sql += " AND "
            sql += filters[-1]
        else:
            print("fetching from mysql without any filters, THIS IS NOT RECOMMENDED")
            sql = f"SELECT * FROM {table}"
        
        return self._execute_multiple_fetch(sql)
    
    def fetch_most_recent(self, table: str, num_rubrics: int = 25):
        sql = "SELECT * FROM " + table + " ORDER BY created_at DESC LIMIT %s"
        val = [num_rubrics]

        cursor = self.sql_connector.cursor()
        cursor.execute(sql, val)
           
        result = cursor.fetchall()
        return result
    
    def update_by_id(self, table: str, id: int, update: dict):
        sql = f"UPDATE {table} SET "
        for column in update.keys():
            sql += column
            sql += " = "
            sql += "'" + str(update[column]) + "', "
        sql = sql[:-2] # remove extra space and comma
        sql += f" WHERE id = {id}"
        
        self._execute_single_update(sql)
    
    def _execute_single_update(self, sql):
        try:
            cursor = self.sql_connector.cursor()
            cursor.execute(sql)
            
            self.sql_connector.commit()
        except Exception as e:
            raise Exception(f"Failed to update single element in mysql database: {e}")

    def _execute_single_insert(self, sql: str, val: list):
        try:
            cursor = self.sql_connector.cursor()
            cursor.execute(sql, val)
            
            self.sql_connector.commit()
        except Exception as e:
            raise Exception(f"Failed to insert single element to mysql database: {e}")
        
    def _execute_multiple_insert(self, sql, val):
        try:
            cursor = self.sql_connector.cursor()
            cursor.executemany(sql, val)
            
            self.sql_connector.commit()
        except Exception as e:
            raise Exception(f"Failed to insert multiple elements to mysql database: {e}")
    
    def _execute_single_fetch(self, sql):
        try:
            cursor = self.sql_connector.cursor()
            cursor.execute(sql)
            
            result = cursor.fetchone()
            return result
        
        except Exception as e:
            raise Exception(f"Failed to execute fetch request to mysql database: {e}")
    
    def _execute_multiple_fetch(self, sql):
        try:
            cursor = self.sql_connector.cursor()
            cursor.execute(sql)
            
            result = cursor.fetchall()
            return result
        
        except Exception as e:
            raise Exception(f"Failed to execute fetch request to mysql database: {e}")