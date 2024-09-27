from flask import Flask, render_template, request, jsonify
from encrytion_V2 import Encrytion

app = Flask(__name__)

@app.route('/')
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

if __name__ == '__main__':
    app.run(debug=True)