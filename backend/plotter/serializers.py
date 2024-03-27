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

    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')

        if email and password:
            user = authenticate(email=email, password=password)

            if not user:
                raise ValidationError('Invalid email or password')
        else:
            raise ValidationError('Email and password must be provided')

        attrs['user'] = user
        return attrs
    

class ClientSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Client
        fields = (
            'id',
            'name',
            'email',
            'phone_number',
            'agent',
            'lists'
        )

class ListSerializer(serializers.HyperlinkedModelSerializer):
    agent = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    client = serializers.PrimaryKeyRelatedField(queryset=Client.objects.all(), allow_null=True, required=False)

    class Meta:
        model = List
        fields = (
            'version',
            'agent',
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
