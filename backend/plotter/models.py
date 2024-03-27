from django.db import models
from django.contrib.auth.models import AbstractUser, PermissionsMixin 

class User(AbstractUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    trec_id = models.CharField(unique=True, max_length=6)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return f'{self.first_name} {self.last_name}'


class Client(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(blank=True)
    phone_number = models.CharField(max_length=20, blank=True)
    agent = models.ForeignKey(User, on_delete=models.CASCADE, related_name='clients')

class List(models.Model):
    version = models.IntegerField()
    creation_date_time = models.DateTimeField(blank=True, auto_now_add=True)
    agent = models.ForeignKey(User, on_delete=models.CASCADE, related_name='lists')
    client = models.ForeignKey(Client, on_delete=models.SET_NULL, null=True, blank=True, related_name='lists')

class Option(models.Model):
    property_name = models.CharField(max_length=100)
    address = models.CharField(max_length=255)
    geo_coordinates = models.CharField(max_length=50)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    unit_number = models.CharField(max_length=20)
    layout = models.CharField(max_length=50)
    sq_ft = models.PositiveIntegerField()
    date_available = models.DateField(blank=True)
    notes_specials = models.TextField('Notes / Specials', blank=True)
    list = models.ForeignKey(List, on_delete=models.CASCADE, related_name='options')

    
