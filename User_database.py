import sqlite3

class DataRecord:
    def __init__(self):
        # Connect to the database
        self.DataBase = sqlite3.connect("User.db")
        self.cc = self.DataBase.cursor()
        # Create the table with data types for each column
        self.cc.execute("""
            CREATE TABLE IF NOT EXISTS UserData ( 
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                UserName TEXT,
                Password TEXT
            )
        """)
        self.DataBase.commit()
        self.cc.execute("""
            CREATE TABLE IF NOT EXISTS UserSettingData ( 
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                Theme TEXT,
                FontSize TEXT
            )
        """)
        self.DataBase.commit()

    def check_user(self,user):
        self.cc.execute('''SELECT UserName FROM UserData ''')
        user_in_DataBase = [row[0] for row in self.cc.fetchall()]
        if user in user_in_DataBase:
            return True
        else:
            return False


    def insert_new_user(self,user,password):
        self.cc.execute('SELECT COUNT(id) FROM UserData')
        id = (self.cc.fetchall()[0][0])+1
        self.cc.execute('INSERT INTO UserData (id, UserName ,Password ) VALUES (? , ?, ?);', (id,user, password))
        self.DataBase.commit()
    
    def check_password(self,user,password):
        execute_text = f'SELECT Password FROM UserData WHERE UserName = "{user}";'
        self.cc.execute(execute_text)
        password_in_db = [row[0] for row in self.cc.fetchall()]
        if password in password_in_db:
            return True
        else:
            return False
        
    def access_account(self,user):
        execute_text = f'SELECT * FROM UserData WHERE UserName = "{user}"'
        self.cc.execute(execute_text)
        data = [row for row in self.cc.fetchall()]
        return[data[0][0],data[0][1],data[0][2]]
    
    def update_account_Username(self,new_username,UserID):
        execute_text = f'UPDATE UserData SET UserName="{new_username}" WHERE id = "{UserID}"'
        self.cc.execute(execute_text)
        self.DataBase.commit()

    def update_account_Password(self,new_Password,UserID):
        execute_text = f'UPDATE UserData SET Password="{new_Password}" WHERE id = "{UserID}"'
        self.cc.execute(execute_text)
        self.DataBase.commit()


    def update_account_setting(self,userID,theme,fontSize):
        execute_text = f'SELECT * FROM UserSettingData WHERE id = "{userID}"'
        self.cc.execute(execute_text)
        data = [row for row in self.cc.fetchall()]
        if data == []:
            execute_text = f'INSERT INTO UserSettingData (id,Theme,Fontsize) VALUES({userID},"{theme}","{fontSize}")'
            
        else:
            execute_text = f'UPDATE UserSettingData SET Theme = "{theme}",Fontsize = "{fontSize}" WHERE id = "{userID}" '

        self.cc.execute(execute_text)
        self.DataBase.commit()

    

        

