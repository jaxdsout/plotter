from rest_framework import serializers
from django.core.exceptions import ValidationError
from django.contrib.auth import authenticate
from .models import User, Client, List, Option

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            'id', 
            'first_name',
            'last_name',
            'email', 
            'trec_id',
            'password'
        )


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()

    def validate(self, clean_data):
        user = authenticate(username=clean_data['email'], password=clean_data['password'])
        print(user)
        if not user:
            raise ValidationError('user not found')
        return user
    
    

class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = (
            'id',
            'name',
            'email',
            'phone_number',
            'user',
        )


class ListSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = List
        fields = (
            'version',
            'user',
            'client',
            'options'
        )

class OptionSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Option
        fields = (
            'id',
            'property_name',
            'address',
            'geo_coordinates',
            'price',
            'unit_number',
            'layout',
            'sq_ft',
            'date_available',
            'notes_specials',
            'list'
        )
