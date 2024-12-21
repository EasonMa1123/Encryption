import smtplib
from email.mime.text import MIMEText

class email_send:
    def __init__(self):
        self.sender = "emencryption@gmail.com"
        self.password = "kpfo ebfp cmqv lfem"


    def send_email(self,subject:str,message:str,recipient:str):
        msg = MIMEText(message)
        msg['Subject'] = subject
        msg['From'] = self.sender
        msg['To'] = recipient
        with smtplib.SMTP_SSL('smtp.gmail.com', 465) as smtp_server:
            smtp_server.login(self.sender, self.password)
            smtp_server.sendmail(self.sender, recipient, msg.as_string())
            print("Message sent!")


