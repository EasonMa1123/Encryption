import random
from Encryption_database import  DataRecord
import zlib
import base64

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

    def encrypter(self, message, password, key, compressed):
        slot_num = random.randint(0, len(self.slots) - 1)
        slot = self.slots[slot_num]
        random_number = random.randint(2, len(message))
        encrypted_message = []
        counter = random_number

        if compressed:
            message += self.split_key + "compressed"
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

    def text_compression(self, message):
        return base64.b64encode(zlib.compress(message.encode('utf-8'))).decode('utf-8')

    def text_decompression(self, message):
        return zlib.decompress(base64.b64decode(message.encode('utf-8'))).decode('utf-8')

    def encryption(self, message, password):
        if len(message) > 100000:
            message = self.text_compression(message)
            compressed = True
        else:
            compressed = False

        data = DataRecord()
        single_encrypted_message, key = self.encrypter(message, password=None, key=None, compressed=compressed)
        while True:
            double_encrypted_data, double_key = self.encrypter(single_encrypted_message, password, key, compressed)
            if not data.check_message(double_encrypted_data):
                data.insert_data(double_encrypted_data, double_key)
                return double_encrypted_data, double_key

    def unencryption(self, message, key, password):
        single_decrypted_message = self.decrypter(message, key)
        if not single_decrypted_message:
            return 405
        
        correct = self.check_password(single_decrypted_message, password)
        if not correct:
            return 405
        
        second_key = self.get_second_key(single_decrypted_message)
        single_decrypted_message = self.remove_password(single_decrypted_message)
        
        if self.check_compression(single_decrypted_message):
            return self.text_decompression(self.decrypter(single_decrypted_message, second_key))
        else:
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

    def check_compression(self, message):
        try:
            return message.split(self.split_key)[-3] == "compressed"
        except IndexError:
            return False