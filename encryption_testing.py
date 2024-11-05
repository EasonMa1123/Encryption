from encryption_V2 import Encrytion
import random
import time as Time

encryption = Encrytion()
slot = "abcdefghijklmnMNOPQRSTUVWXYZopqrstuvwxyzABCDEFGHIJKL!@#$%^&*()_+-=[]{|\;}:',./<>?`~1234567890 "
password = "123"

def check_encryption():
    incorrect_counter = 0
    invalid_counter = 0
    total_test_time = 100
    en_run_times = []
    de_run_times = []
    
    for i in range(total_test_time):
        plain_text = ""
        for time in range(1000000):
            plain_text += slot[random.randrange(len(slot))]
        encryption_start_time = Time.time()
        cipyer_message,key = encryption.encryption(plain_text,password)
        encryption_end_time = Time.time()
        en_run_times.append(encryption_end_time-encryption_start_time)
        decryption_start_time = Time.time()
        return_message = encryption.unencryption(cipyer_message,key,password)
        decryption_end_time = Time.time()
        de_run_times.append(decryption_end_time-decryption_start_time)
        if return_message != plain_text and return_message!= "Invalid Password,unable to decrypte":
            incorrect_counter+=1
            print(f'Incorrect encryption/decryption: Plain text: {plain_text},key: {key},return message: {return_message}')
        elif return_message == "Invalid Password,unable to decrypte":
            print("Invalid Password,unable to decrypte")
            invalid_counter +=1
        if i%100 == 0:
            print(f'testing number: {i}')
    print(f'total Incorrect: {incorrect_counter},total invalid: {invalid_counter}\n In% : Incorrect: {incorrect_counter/total_test_time}, invalid: {invalid_counter/total_test_time}\nAverage encrytption time:{sum(en_run_times)/len(en_run_times)}\nAverage decryption time:{sum(de_run_times)/len(de_run_times)}')

check_encryption()