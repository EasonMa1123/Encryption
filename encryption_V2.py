import random
import concurrent.futures
from Encryption_database import  DataRecord


class Encrytion:
    
    def __init__(self):
        
        self.slots = ["abcdefghijklmnMNOPQRSTUVWXYZopqrstuvwxyzABCDEFGHIJKL!@#$%^&*()_+-=[]{|\;}:',./<>?`~1234567890 ",
                      "ABCDEFGHI@#$%^&*()_+-=[]{|\;}:',./<>?`~JKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!1234567890 ",
                      "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+-=[]{|\;}:',./<>?`~1234567890 abcdefghijklmnopqrstuvwxyz",
                      "ABCDEFGHI@#$%^&*()_+-=[]{|\;}:',./<>?`~JKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!1234567890 ",
                      "ABCDEFGMNOPQRSTUVWXYZabcdefghijHI@#$%^&*()_+-=[]{|\;}:',./<>?`~JKLklmnopqrstuvwxyz!1234567890 ",
                      "ABCDEFMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!12345GHI@#$%^&*()_+-=[]{|\;}:',./<>?`~JKL67890 ",
                      "ABCDEFGHI@~JKLMNOPQRSTUVWXYZabcdefghijklmnopqrstu#$%^&*()_+-=[]{|\;}:',./<>?`vwxyz!1234567890 ",
                      "ABCDE<>?`~JKLMNOPQRSTUVWXYZabcdefghijklmnFGHI@#$%^&*()_+-=[]{|\;}:',./opqrstuvwxyz!1234567890 ",
                      "ABCDE<>?`~JKLMNOPQRSTUVWXY^&*()_+-=[]{|\;}:',./opqrstuvwxyz!1234567890 ZabcdefghijklmnFGHI@#$%",
                      "abcdefghijklmnMNOPQRSTUVFGHIJKL!@#$%^&*()_+-=[]{|\;}:',./<>?`~123456789WXYZopqrstuvwxyzABCDE0 ",
                      "abcdefghYZopqrstuvwxyzABCDEFGHIJKL!@#$%^&*()_+-=[]{|\;}:',.ijklmnMNOPQRSTUVWX/<>?`~1234567890 ",
                      "abcdefghijklmn',./<>?`~1234567890 MNOPQRSTUVWXYZopqrstuvwxyzABCDEFGHIJKL!@#$%^&*()_+-=[]{|\;}:",
                      "opqrstuvwxyzABCDEFGHIJKL!@#$%^&*()_+-=[abcdefghijklmnMNOPQRSTUVWXYZ]{|\;}:',./<>?`~1234567890 ",
                      "abcdefghijklmnMNOPQRSTUVWXYZopqrstuvwx*()_+-=[]{|\;}:',./<>yzABCDEFGHIJKL!@#$%^&?`~1234567890 ",
                      "abcdWXYZopqrstuvwxyzABCDEFGHIJKL!@#$%^&*()_+-=[]{|\;}:',./<>?`~efghijklmnMNOPQRSTUV1234567890 ",
                      ]
        


        self.letter = ""
        self.split_key = "#~~123~~##~~qwer~"
        self.split_amount = 4
        self.init_key = 3

    def encrypter(self, message, password, key,init_key):
        if init_key:
            slot_num = init_key
            random_number = init_key
        else:
            slot_num = random.randint(0, len(self.slots) - 1)
            random_number = random.randint(2, len(message))

        slot = self.slots[slot_num]
        
        encrypted_message = []
        counter = random_number

        
        if password:
            message += self.split_key + str(password)
        if key:
            message += self.split_key + str(key)

        for word in message:
            word_location = slot.find(word)
            encrypted_location = (word_location + counter) % len(slot)
            encrypted_message.append(slot[encrypted_location])
            counter *= random_number

        return ''.join(encrypted_message[::-1]), f'{random_number} {slot_num}'

    def decrypter(self, message, key):
        decrypted_message = []
        message = message[::-1]
        split_key = key.split(" ")
        try:
            slot = self.slots[int(split_key[1])]
        except:
            return None
        
        counter = int(split_key[0])
        for word in message:
            word_location = slot.find(word)
            decrypted_location = (word_location - (counter % len(slot))) % len(slot)
            decrypted_message.append(slot[decrypted_location])
            counter *= int(split_key[0])

        return ''.join(decrypted_message)

    

    def single_encryption(self, message, password):


        data = DataRecord()
        single_encrypted_message, key = self.encrypter(message, password=None, key=None,init_key=None)
        while True:
            double_encrypted_data, double_key = self.encrypter(single_encrypted_message, password, key,init_key=None)
            if not data.check_message(double_encrypted_data):
                
                data.insert_data(double_encrypted_data, double_key)
                return double_encrypted_data, double_key

    def single_unencryption(self, message, key, password):
        single_decrypted_message = self.decrypter(message, key)
        if not single_decrypted_message:
            return 405
        
        correct = self.check_password(single_decrypted_message, password)
        if not correct:
            return 405
        
        second_key = self.get_second_key(single_decrypted_message)
        single_decrypted_message = self.remove_password(single_decrypted_message)
        
        return self.decrypter(single_decrypted_message, second_key)

    def check_password(self, message, password):
        parts = message.split(self.split_key)
        try:
            return parts[-2] == password
        except IndexError:
            return False

    def get_second_key(self, message):
        return message.split(self.split_key)[-1]

    def remove_password(self, message):
        return message.split(self.split_key)[0]

    def split_plain_text(self,message):
        new_message = []
        if len(message)%self.split_amount <2:
            message += "   "

        for i in range((len(message)//self.split_amount)+1):
            new_message.append(message[self.split_amount*i:(self.split_amount*(i+1))])
        
        return new_message

    def merge_cipher(self,message):
        cipher_text = ""
        for i in message:
            cipher_text += i[0]
        return cipher_text

    def encrypt_key(self,message):
        key = ""

        for i in message:
            key += i[1]
        
        return self.encrypter(key,False,False,self.init_key)


    def encryption(self,message, password):
        if len(message)<self.split_amount:
            return self.single_encryption(message,password)
        else:
            message_list = self.split_plain_text(message)
            password_list = [password for i in range((len(message)//self.split_amount)+1)]
            with concurrent.futures.ThreadPoolExecutor() as executor:
                Encrypted_list=list(executor.map(self.single_encryption, message_list,password_list))
                print(Encrypted_list)
                for i in range(len(Encrypted_list)):
                    print(len(Encrypted_list[i][0]))
                
            return self.merge_cipher(Encrypted_list),self.encrypt_key(Encrypted_list)[0]
    
    def unencryption(self,message, key, password):
        return self.single_unencryption(message, key, password)
    

print(Encrytion().encryption("123456789101112131411","12"))