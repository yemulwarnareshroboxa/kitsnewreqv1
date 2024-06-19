import random


def generate_otp():
    fixed_digits = 6
    return random.randrange(111111, 999999, fixed_digits)


otp_email_body = """From: secure.services@kits.org.in
Subject: One Time Password for login on KITs

Dear {},

OTP: {}

above OTP is valid for 2mins, pls do not share OTP with anyone.


Sincerely,
KITs Team
"""


def get_otp_email_template():
    return otp_email_body
