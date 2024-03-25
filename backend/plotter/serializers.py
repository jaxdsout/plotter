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

class UserRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

    def create(self, validated_data):
        username = validated_data.get('username')
        email = validated_data.get('email')
        password = validated_data.get('password')

        if not username:
            raise serializers.ValidationError('Username is required')
        
        user = User.objects.create_user(username=username, email=email, password=password)
        return user


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()

    def validate(self, attrs):
        username = attrs.get('username')
        password = attrs.get('password')

        if username and password:
            user = authenticate(username=username, password=password)
            if not user:
                raise serializers.ValidationError('Invalid username or password')
            else:
                raise serializers.ValidationError('Both username and password are required')
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
