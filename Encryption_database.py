import sqlite3

class DataRecord:
    def __init__(self):
        self.setup()

    def setup(self):
        # Connect to the database
        self.DataBase = sqlite3.connect("message_encrypted.db")
        self.cc = self.DataBase.cursor()
        # Create the table with data types for each column
        self.cc.execute("""
            CREATE TABLE IF NOT EXISTS message (
                encrypted_message TEXT,
                key TEXT
            )
        """)
        self.DataBase.commit()

    def insert_data(self, message, key):
        self.setup()
        self.cc.execute('INSERT INTO message ( encrypted_message, key) VALUES (?, ?);', (message, key))
        self.DataBase.commit()
        self.DataBase.close()


    def check_message(self,message):
        self.setup()
        self.cc.execute('SELECT encrypted_message FROM message')
        message_in_db = [row[0] for row in self.cc.fetchall()]


        for i in message_in_db:
            if message in message_in_db:
                return True
        self.DataBase.close()
        return False
    
