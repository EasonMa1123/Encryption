from encryption_V2 import Encrytion
import random
import time as Time




slot = "ABCDEFGHI@#$%^&*()_+-=[]{|\;}:',./<>?`~JKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!1234567890 "
password = "123"

def check_encryption(text_length,split_amount):
    encryption = Encrytion(split_amount)
    incorrect_counter = 0
    invalid_counter = 0
    total_test_time = 1000
    
    en_run_times = []
    de_run_times = []
    
    for i in range(total_test_time):

        plain_text = ""
        for time in range(text_length):
            plain_text += str(slot[random.randrange(len(slot))])

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

        
        
        elif str(plain_text).strip() != str(return_message).strip():
            incorrect_counter+=1
            if len(return_message)-1 != len(plain_text):
                print(f'Different Length {len(return_message)-1} {len(plain_text)}')
            else:
                for i, (char_a, char_b) in enumerate(zip(plain_text, return_message)):
                    if char_a != char_b:
                        print(f"Difference at index {i}: {char_a!r} != {char_b!r}")
            print(f'Incorrect encryption/decryption: Plain text: \n{plain_text}')
            print(f'\nkey: {key},\nreturn message: \n{return_message}\n\n')


        if i%100 == 0:
            print(f'testing number: {i}')


    print(f'total Incorrect: {incorrect_counter},total invalid: {invalid_counter}\n In% : Incorrect: {incorrect_counter/total_test_time}, invalid: {invalid_counter/total_test_time}\nAverage encrytption time:{sum(en_run_times)/len(en_run_times)}\nAverage decryption time:{sum(de_run_times)/len(de_run_times)}')
    return sum(en_run_times)/len(en_run_times),sum(de_run_times)/len(de_run_times)


