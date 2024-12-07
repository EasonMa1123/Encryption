from encryption_V2 import Encrytion
import random
import time as Time
import matplotlib.pyplot as graph

encryption = Encrytion()
slot = "abcdefghijklmnMNOPQRSTUVWXYZopqrstuvwxyzABCDEFGHIJKL!@#$%^&*()_+-=[]{|\;}:',./<>?`~1234567890 "
password = "123"

def check_encryption(text_length):
    
    incorrect_counter = 0
    invalid_counter = 0
    total_test_time = 3
    
    en_run_times = []
    de_run_times = []
    
    for i in range(total_test_time):

        plain_text = ""
        for time in range(text_length):
            plain_text += slot[random.randrange(len(slot))]

        encryption_start_time = Time.time()
        cipyer_message,key = encryption.encryption(plain_text,password)
        encryption_end_time = Time.time()
        en_run_times.append(encryption_end_time-encryption_start_time)

        decryption_start_time = Time.time()
        return_message = encryption.unencryption(cipyer_message,key,password)
        decryption_end_time = Time.time()
        de_run_times.append(decryption_end_time-decryption_start_time)



        if return_message == "Invalid Password,unable to decrypte":
            print("Invalid Password,unable to decrypte")
            invalid_counter +=1
        
        elif return_message != plain_text :
            incorrect_counter+=1
            print(f'Incorrect encryption/decryption: Plain text: {plain_text}')
            print(f'\n\n\nkey: {key},\n\n\nreturn message: {return_message}')


        if i%100 == 0:
            print(f'testing number: {i}')


    print(f'total Incorrect: {incorrect_counter},total invalid: {invalid_counter}\n In% : Incorrect: {incorrect_counter/total_test_time}, invalid: {invalid_counter/total_test_time}\nAverage encrytption time:{sum(en_run_times)/len(en_run_times)}\nAverage decryption time:{sum(de_run_times)/len(de_run_times)}')
    return sum(en_run_times)/len(en_run_times),sum(de_run_times)/len(de_run_times)


def main():
    Enc_times = []
    dec_times = []
    for i in range(1,7):
        print(f'10 to the power {i}')
        Enc_time,dec_time = check_encryption(10**i)
        Enc_times.append(Enc_time)
        dec_times.append(dec_time)

    graph.plot(Enc_times)
    graph.plot(dec_times)
    graph.show()

main()