from mypythonlib.encryption_V2 import Encrytion

def test_encryption():
    cipher_text,password = Encrytion().encryption("this is a message","123") 
    assert Encrytion().unencryption(cipher_text,password,"123") == "this is a message"