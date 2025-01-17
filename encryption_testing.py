from encryption_V2 import Encrytion
import random
import time as Time
import secrets
import string



class encryption_test:
    def __init__(self):


        self.slot = "ABCDEFGHI@#$%^&*()_+-=[]{|\;}:',./<>?`~JKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!1234567890 "
        self.password = "123"
    
    def generate_random_string(self,length):
        
        alphabet = string.ascii_letters + string.digits  # Uppercase, lowercase, and digits
        return ''.join(secrets.choice(alphabet) for _ in range(length))

    def check_encryption(self,text_length,split_amount,trial_num=10,debug=False):
        slot = self.slot
        password = self.password
        encryption = Encrytion(split_amount)
        incorrect_counter = 0
        invalid_counter = 0
        total_test_time = trial_num
        
        en_run_times = []
        de_run_times = []
        
        for i in range(total_test_time):
            if text_length < 10:
                plain_text = self.generate_random_string(5)
            else:
                plain_text = self.generate_random_string(text_length)

            
            encryption_start_time = Time.time()
            cipyer_message,key = encryption.encryption(plain_text,password)
            encryption_end_time = Time.time()
            en_run_times.append(encryption_end_time-encryption_start_time)

            decryption_start_time = Time.time()
            return_message = encryption.unencryption(cipyer_message,key,password)
            decryption_end_time = Time.time()
            de_run_times.append(decryption_end_time-decryption_start_time)


            if debug:
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

        if debug:
            print(f'total Incorrect: {incorrect_counter},total invalid: {invalid_counter}\n In% : Incorrect: {incorrect_counter/total_test_time}, invalid: {invalid_counter/total_test_time}\nAverage encrytption time:{sum(en_run_times)/len(en_run_times)}\nAverage decryption time:{sum(de_run_times)/len(de_run_times)}')
        return sum(en_run_times)/len(en_run_times),sum(de_run_times)/len(de_run_times)


    def test(self,power:int,min_power:int,maximum_text_length:int,trial_num:int,debug:bool):
        Enc_times = ""
        for j in range(min_power,power+1):
            for i in range(maximum_text_length+1):
                Enc_time,dec_time = self.check_encryption(10**i,10**j,trial_num,debug)
                if i<=maximum_text_length-1:
                    Enc_times+=f'{str(Enc_time)}:'
                else:
                    Enc_times+=f'{str(Enc_time)}'
            if j<=power-1:
                Enc_times+=","


        return Enc_times
