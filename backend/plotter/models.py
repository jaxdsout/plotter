from django.db import models
from django.conf import settings

class Agent (models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    trec_id = models.CharField(unique=True, max_length=6)

    def __str__(self):
        return self.user.email
    

class Property(models.Model):
    MARKETS = [
        ('hou', 'Houston',),
        ('dfw', 'Dallas / Fort Worth'),
        ('atx', 'Austin')
    ]
    name = models.CharField(max_length=200)
    website = models.CharField(max_length=250)
    market = models.CharField(max_length=100, choices=MARKETS)
    neighborhood = models.CharField(max_length=250)
    address = models.CharField(max_length=250)
    latitude = models.CharField(max_length=100)
    longitude = models.CharField(max_length=100)


class Client(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(blank=True)
    phone_number = models.CharField(max_length=20, blank=True)
    agent = models.ForeignKey(Agent, on_delete=models.CASCADE, related_name='clients')

    def __str__(self):
        return self.name

class List(models.Model):
    creation = models.DateTimeField(blank=True, auto_now_add=True)
    agent = models.ForeignKey(Agent, on_delete=models.CASCADE, related_name='lists')
    client = models.ForeignKey(Client, on_delete=models.SET_NULL, null=True, blank=True, related_name='lists')

    def __str__(self):
        return str(self.client) + " List Ver. No. " + str(self.id)

class Option(models.Model):
    property = models.ForeignKey(Property, on_delete=models.CASCADE)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    unit_number = models.CharField(max_length=20)
    layout = models.CharField(max_length=50)
    sq_ft = models.PositiveIntegerField()
    date_available = models.DateField(blank=True)
    notes_specials = models.TextField('Notes / Specials', blank=True)
    list = models.ForeignKey(List, on_delete=models.CASCADE, related_name='options')