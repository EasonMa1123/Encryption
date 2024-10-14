import sqlite3

class DataRecord:
    def __init__(self):
        # Connect to the database
        self.DataBase = sqlite3.connect("User.db")
        self.cc = self.DataBase.cursor()
        # Create the table with data types for each column
        self.cc.execute("""
            CREATE TABLE IF NOT EXISTS message (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                UserName TEXT,
                Password TEXT,
                Email TEXT
            )
        """)
        self.DataBase.commit()

    def check_user(self,user):
        pass
    