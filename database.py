import sqlite3

def create_check_database():
    DataBase = sqlite3.connect("message_encrypted.db")
    cc = DataBase.cursor()
    cc.execute("CREATE TABLE IF NOT EXISTS message (id,encrypted_message,key)")
    DataBase.commit()
    


create_check_database() 