import smtplib
import os


def send_mail(to_address, msg):
    email = os.environ.get("MAIL_USERNAME")
    password = os.environ.get("MAIL_PASSWORD")
    to = to_address

    server = smtplib.SMTP("smtp.gmail.com", 587)
    server.starttls()
    server.login(email, password)
    try:
        server.sendmail(email, to, msg)
    except smtplib.SMTPException as e:
        print(e)
    """
    with smtplib.SMTP_SSL('smptp.gmail.com',587) as smtp:

        smtp.login(email, password)

        subject = "testing mail sending"
        body = "the mail itself"

        msg = "Subject: {}\n\n{}".format(subject, body)
        try:
            smtp.sendmail(email, to, msg)
        except smtplib.SMTPException as e:
            print(e)
    """
