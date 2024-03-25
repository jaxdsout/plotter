from rest_framework import serializers
from .models import Agent, Client, List, Option

class AgentSerializer(serializers.ModelSerializer):
    email = serializers.EmailField()

    class Meta:
        model = Agent
        fields = (
            'id', 
            'first_name',
            'last_name',
            'email', 
            'phone_number',
            'trec_id',
            'password'
        )

class ClientSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Client
        fields = (
            'id',
            'name',
            'email',
            'phone_number',
            'agent'
        )

class ListSerializer(serializers.HyperlinkedModelSerializer):
    agent = serializers.PrimaryKeyRelatedField(queryset=Agent.objects.all())
    client = serializers.PrimaryKeyRelatedField(queryset=Client.objects.all(), allow_null=True, required=False)

    class Meta:
        model = List
        fields = (
            'version',
            'options',
            'agent',
            'client'
        )

class OptionSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Option
        fields = (
            'property_name',
            'address',
            'geo_coordinates',
            'list',
            'details',
            'price',
            'unit_number',
            'layout',
            'sq_ft',
            'date_available',
            'notes_specials'
        )