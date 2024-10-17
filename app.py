from flask import Flask, render_template, request, jsonify
from encryption_V2 import Encrytion
from User_database import DataRecord
from password_strength import password_strength_checker


app = Flask(__name__)


@app.route('/')
def home():
    return render_template('home.html')

@app.route('/index')
def index():
    return render_template('index.html')



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
    if DataRecord().check_user(userName):
        return  jsonify({"Feedback":"Invalid Username,This Username had been used "}) 
    else:
        DataRecord().insert_new_user(userName,password)

@app.route('/password_strength', methods = ['POST'])
def password_strength_check():
    password = request.form['Password']
    score = password_strength_checker().password_check(password)
    return jsonify({"score":score})


if __name__ == '__main__':
    try:
        app.run(debug=True)
    except:
        app.run(debug=True,port=5001)

