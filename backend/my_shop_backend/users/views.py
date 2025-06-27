# backend/my_shop_backend/users/views.py
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .models import User
from .serializers import UserProfileSerializer

class UserProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = UserProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user