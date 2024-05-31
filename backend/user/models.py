from django.db import models
from django.contrib.auth.models import AbstractUser
# Permissions,Mixin
# from django.contrib.auth.hashers import make_password, check_password
# from django.utils.text import slugify


class User(AbstractUser):
    email = models.EmailField( verbose_name='email', max_length=255, unique=True)
    REQUIRED_FIELDS = ['username']
    USERNAME_FIELD = 'email'

    def get_username(self):
        return self.email
    
    # def set_password(self, raw_password):
    #     self.password = make_password(raw_password)
    # def check_password(self, raw_password):
    #     return check_password(raw_password, self.password)
    
    # def save(self, *args, **kwargs):
    #     if not self.username:
    #         self.username = slugify(self.email.split('@')[0])
    #     if self.password:
    #         self.password = make_password(self.password)
    #     super().save(*args, **kwargs)

    # def __str__(self):
    #     return f'{self.first_name} {self.last_name}'
