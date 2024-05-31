from rest_framework import serializers
from .models import Property, Agent, Client, List, Option


class AgentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Agent
        fields = (
            'id',
            'trec_id'
        )

class PropertySerializer(serializers.ModelSerializer):
    class Meta:
        model = Property
        fields = (
            'id',
            'name',
            'address',
            'coordinate'
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