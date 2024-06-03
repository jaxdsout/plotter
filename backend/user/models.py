from django.db import models
from django.contrib.auth.models import AbstractUser, PermissionsMixin

    
class User(AbstractUser, PermissionsMixin):
    email = models.EmailField(verbose_name='email', max_length=255, unique=True)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name', 'username']

    def get_username(self):
        return self.email
    
    def __str__(self):
        return self.email
    
    def get_full_name(self) -> str:
        return super().get_full_name()
    
    
    
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
