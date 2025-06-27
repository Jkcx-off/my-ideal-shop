# backend/my_shop_backend/users/serializers.py
from rest_framework import serializers
from .models import User

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'phone_number', 'username', 'first_name', 'last_name']
        read_only_fields = ['id', 'phone_number']