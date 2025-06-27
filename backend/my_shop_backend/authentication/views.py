from rest_framework import generics
from rest_framework.permissions import AllowAny
from users.models import User
from .serializers import RegisterSerializer

# Этот View отвечает ТОЛЬКО за создание нового пользователя (регистрацию).
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = [AllowAny] # Разрешаем доступ всем
    serializer_class = RegisterSerializer