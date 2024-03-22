from django.db import models
from django.contrib.auth.hashers import make_password, check_password


class Agent(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField(blank=True)
    phone_number = models.CharField(max_length=20, blank=True)
    trec_id = models.IntegerField('TREC ID')
    password = models.CharField(max_length=128)

    def set_password(self, raw_password):
        self.password = make_password(raw_password)

    def check_password(self, raw_password):
        return check_password(raw_password, self.password)
    
    def save(self, *args, **kwargs):
        if not self.password.startswith('pbkdf2_sha256$'):
            self.set_password(self.password)
        super().save(*args, **kwargs)

    def __str__(self) -> str:
        return f"{self.first_name} {self.last_name}"
        
class Client(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(blank=True)
    phone_number = models.CharField(max_length=20, blank=True)
    agent = models.ForeignKey(Agent, on_delete=models.CASCADE, related_name='clients')

class List(models.Model):
    version = models.IntegerField()
    creation_date_time = models.DateTimeField(blank=True, auto_now_add=True)
    agent = models.ForeignKey(Agent, on_delete=models.CASCADE, related_name='lists')
    client = models.ForeignKey(Client, on_delete=models.SET_NULL, null=True, blank=True, related_name='lists')

class Option(models.Model):
    property_name = models.CharField(max_length=100)
    address = models.CharField(max_length=255)
    geo_coordinates = models.CharField(max_length=50)
    list = models.ForeignKey(List, on_delete=models.CASCADE, related_name='options')

class Detail(models.Model):
    price = models.DecimalField(max_digits=10, decimal_places=2)
    unit_number = models.CharField(max_length=20)
    layout = models.CharField(max_length=50)
    sq_ft = models.PositiveIntegerField()
    date_available = models.DateField()
    notes_specials = models.TextField('Notes / Specials', blank=True)
    option = models.ForeignKey(Option, on_delete=models.CASCADE, related_name='details')
