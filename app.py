from flask import Flask, render_template, request, jsonify
from encryption_V2 import Encrytion
from User_database import DataRecord
from password_strength import password_strength_checker

from encryption_testing import encryption_test

from email_sender import email_send





app = Flask(__name__)



@app.route('/')
def redirect():
    return render_template('redirect.html')

@app.route('/login')
def home():
    return render_template('home.html')

@app.route('/index')
def index():
    return render_template('index.html')

@app.route('/testing')
def testing():
    return render_template('testing.html')



@app.route('/encrypt', methods=['POST'])
def encrypt_message():
    encryption = Encrytion()
    message = request.form['message']
    password = request.form['password']
    encrypted_message, key = encryption.encryption(message,password)
    return jsonify({'encrypted_message': encrypted_message, 'key': key})

@app.route('/decrypt', methods=['POST'])
def decrypt_message():
    decryption = Encrytion()
    encrypted_message = request.form['message']
    key = request.form['key']
    password = request.form['password']
    decrypted_message = decryption.unencryption(encrypted_message, key,password)
    return jsonify({'decrypted_message': decrypted_message})


@app.route('/CheckUserPassword',methods = ['POST'])
def Check_user_password():
    userName = request.form['userName']
    password = request.form['Password']
    if DataRecord().check_password(userName,password):
        return jsonify({"check":True})
    else:
        return jsonify({"check":False})
    
@app.route('/insertNewUser', methods = ['POST'])
def insert_new_user():
    userName = request.form['userName']
    password = request.form['Password']
    Email = request.form['Email']
    if DataRecord().check_user(userName):
        return jsonify({"Feedback":"Invalid Username,This Username had been used "}) 
    else:
        DataRecord().insert_new_user(userName,password,Email)
        return jsonify({"Feedback":"Success"})

@app.route('/password_strength', methods = ['POST'])
def password_strength_check():
    password = request.form['Password']
    score = password_strength_checker().password_check(password)
    return jsonify({"score":score})

@app.route('/access_account_detail', methods = ['POST'])
def access_account_detail():
    Username = request.form['Username']
    return jsonify({"ID":DataRecord().access_account(Username)[0],
                    "Username":DataRecord().access_account(Username)[1],
                    "Password":DataRecord().access_account(Username)[2],
                    "email":DataRecord().access_account(Username)[3]})

@app.route('/update_account_username',methods = ['POST'])
def update_account_username():
    id = request.form['id']
    new_username = request.form['New_username']
    DataRecord().update_account_Username(new_username,id)
    return jsonify({"Feedback":True})
    

@app.route('/password_Update',methods = ['POST'])
def update_account_password():
    id = request.form['id']
    new_password = request.form['New_password']
    DataRecord().update_account_Password(new_password,id)
    return jsonify({"Feedback":True})
    

@app.route('/update_user_setting',methods = ['POST'])
def update_user_setting():
    id = request.form['id']
    theme = request.form['theme']
    fontsize = request.form['fontSize']
    DataRecord().update_account_setting(id,theme,fontsize)
    return jsonify({"Feedback":True})

@app.route('/update_user_email',methods=['POST'])
def update_user_email():
    id = request.form["id"]
    email = request.form["email"]
    return jsonify({"Feedback":DataRecord().update_account_Email(email,id)})

@app.route('/access_user_setting',methods = ['POST'])
def access_user_setting():
    id = request.form['id']
    data = DataRecord().access_account_setting(id,False)
    if data ==  None:
        return jsonify({"Theme":None,"Fontsize":None})
    else:
        return jsonify({"Theme":data[1],"Fontsize":data[2]})


@app.route('/encryption_testing',methods = ['POST'])
def encryption_testing():
    power = request.form['Power']
    max_text_length = request.form['max_text_length']
    min_power = request.form['min_power']
    trial_num = request.form['trial_num']
    str_grow = request.form['Str_grow']
    str_length_index = request.form['str_index']
    result = encryption_test().test(int(power),int(min_power),int(max_text_length),int(trial_num),str_grow,int(str_length_index),False)
    return jsonify({"graphData":result})


@app.route('/email_verification',methods = ['POST'])
def email_verification():
    import random
    email = request.form['Email']
    code = random.randint(10000,99999)
    Title = "email Verification"
    Body = f'{code}'
    email_send().send_email(Title,Body,email)
    return jsonify({"Code":code})

if __name__ == '__main__':
    app.run(debug=False,port=8080,host="0.0.0.0")


