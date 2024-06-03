from rest_framework import serializers
from .models import Property, Agent, Client, List, Option


class AgentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Agent
        fields = (
            'trec_id',
            'user'
        )

class PropertySerializer(serializers.ModelSerializer):
    class Meta:
        model = Property
        fields = (
            'id',
            'name',
            'website',
            'market',
            'neighborhood',
            'address',
            'latitude',
            'longitude'
        )

class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = (
            'id',
            'name',
            'email',
            'phone_number',
            'agent',
        )

class ListSerializer(serializers.ModelSerializer):
    class Meta:
        model = List
        fields = (
            'id',
            'creation',
            'agent',
            'client',
            'options'
        )

class OptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Option
        fields = (
            'property',
            'price',
            'unit_number',
            'layout',
            'sq_ft',
            'date_available',
            'notes_specials',
            'list'
        )