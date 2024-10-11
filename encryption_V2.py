import random
from database import  DataRecord
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

    def encrypter(self,message,password,key,compressed):
        

        slot_num = random.randint(0,len(self.slots)-1)
        slot = self.slots[slot_num]
        #print(self.letter,len(self.message))
        random_number = random.randint(2,len(message))
        #print(random_number)
        encryted_message = ""
        counter = random_number

        if compressed ==  True:
            message += self.split_key + "compressed"

        if password != None:
            message+= self.split_key + str(password)

        if key != None:
            message += self.split_key + str(key)
        

            

        for word in message:
            word_location = slot.find(word)
            encryted_location=word_location+counter

            if encryted_location > len(slot)-1:
                encryted_location = encryted_location % len(slot)

  

            encryted_message+=slot[encryted_location]
            #encryted_message+=slot[random.randint(1,len(slot)-1)]
            counter*=random_number

        return_value = f'{encryted_message}'
        key = f'{random_number} {slot_num}'
        return return_value[::-1],key



    def split_letter(self,text):
        
        text = list(text)
        new_text = ""
        
        for i in range(len(text)):
            if i%2 == 0:
                new_text+=text[i]
        return new_text

    
    def check_password(self,message,password):
        message_splited=message.split(self.split_key)
        #print(message_splited) 
        try:
            real_password = message_splited[-2]
        except:
            return None
        

        if real_password == password:
            return True
        else:
            #print(message_splited)
            return False
        
    def get_second_key(self,message):
        return message.split(self.split_key)[-1]
    

    def remove_password(self,message):
        return message.split(self.split_key)[0]


    def check_compression(self,message):
        try:
            if "compressed" == message.split(self.split_key)[-3]:
                return True
        except:

            return False
        

    def text_decompression(self,message):
        compressed_data = base64.b64decode(message.encode('utf-8'))
        decompressed_data = zlib.decompress(compressed_data,4)
        decompressed_string = decompressed_data.decode('utf-8')
        return decompressed_string

    def text_compression(self,message):
        encoded_message = message.encode('utf-8')
        compressed_data = zlib.compress(encoded_message,4)
        compressed_string = base64.b64encode(compressed_data).decode('utf-8')

        return compressed_string
        
        
        
    def decrypter(self,message,key):

        #print(message,key)
        encryted_message = ""
        message = message[::-1]
        split_key = key.split(" ")
        #message = self.split_letter(message)
        
        #print(split_message)
        try:
            self.letter = self.slots[int(split_key[1])]
        except:
            return None
        counter_location = split_key[0] 
        counter = int(counter_location)
        #print(message)
        
        for word in message:
            word_location = self.letter.find(word)
            pre_encryted_location=word_location-(counter% len(self.letter))
            encryted_location = pre_encryted_location 
            #print(f'{word} {word_location} {pre_encryted_location} {encryted_location} {self.letter[encryted_location]} {self.letter}')
            encryted_message+=self.letter[encryted_location]
            counter*=int(counter_location)

        
            

        return encryted_message


    def encrytion_list_length(self):
        return len(self.slots)
    

    def encryption(self,message,password):
        if len(message) > 100000:
                message = self.text_compression(message)
                compressed = True
        else: 
            compressed = False

        Data = DataRecord()
        single_encrypted_message,key = self.encrypter(message,password=None,key=None,compressed = None)
        while True:
             double_encrypted_data,double_key = self.encrypter(single_encrypted_message,password,key,compressed)
             if not(Data.check_message(double_encrypted_data)):
                Data.insert_data(double_encrypted_data,double_key)
                return double_encrypted_data,double_key
                 



    def unencryption(self,message,key:str,password:str):
        single_decrypted_message= self.decrypter(message,key)
        if single_decrypted_message == None:
            return 405
        #print(single_edecrypted_message)
        Correct=self.check_password(single_decrypted_message,password)
        compression_message = single_decrypted_message
        
        if Correct != None:
            if Correct:
                second_key = str(self.get_second_key(single_decrypted_message))
                single_decrypted_message = str(self.remove_password(single_decrypted_message))
                
                if self.check_compression(compression_message):
                    return self.text_decompression(self.decrypter(single_decrypted_message,second_key))
                else:
                    return self.decrypter(single_decrypted_message,second_key)
            else:
                return 405
        else:
            return 405
    

    
