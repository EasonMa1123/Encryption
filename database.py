import sqlite3

class DataRecord:
    def __init__(self):
        # Connect to the database
        self.DataBase = sqlite3.connect("message_encrypted.db")
        self.cc = self.DataBase.cursor()
        # Create the table with data types for each column
        self.cc.execute("""
            CREATE TABLE IF NOT EXISTS message (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                encrypted_message TEXT,
                key TEXT
            )
        """)
        self.DataBase.commit()

    def insert_data(self, message, key):
        self.cc.execute('SELECT COUNT(id) FROM message')
        id = self.cc.fetchall()[0][0]
        self.cc.execute('INSERT INTO message (id , encrypted_message, key) VALUES (? , ?, ?);', (id,message, key))
        self.DataBase.commit()

# Create an instance of DataRecord and insert data
data = DataRecord()
data.insert_data('hi', '1')
