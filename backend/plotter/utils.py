from django.conf import settings
from datetime import datetime, timedelta
import jwt
import os


def generate_token(user):
    payload = {
        'trec_id' : user.trec_id,
        'exp': datetime.now() + timedelta(days=1, minutes=0),
        'iat': datetime.now()
    }
    
    access_token = jwt.encode(payload, os.environ['SECRET_KEY'], algorithm='HS256')
    return access_token