from rest_framework import serializers
from users.models import User # Мы ссылаемся на модель User из другого приложения

class RegisterSerializer(serializers.ModelSerializer):
    # Поле для подтверждения пароля. Оно только для записи, в базу не попадает.
    password2 = serializers.CharField(style={'input_type': 'password'}, write_only=True)

    class Meta:
        model = User
        # Мы ожидаем от фронтенда только локальную часть номера и два пароля
        fields = ['phone_number', 'password', 'password2']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def validate(self, data):
        """
        Эта функция проверяет входящие данные перед созданием пользователя.
        """
        # Проверяем, что пароли совпадают
        if data['password'] != data['password2']:
            raise serializers.ValidationError({"password": "Пароли не совпадают."})
        
        # "Склеиваем" полный номер телефона для проверки на уникальность
        full_phone_number = f"+993{data['phone_number']}"
        if User.objects.filter(phone_number=full_phone_number).exists():
            raise serializers.ValidationError({"phone_number": "Пользователь с таким номером уже существует."})

        return data

    def create(self, validated_data):
        """
        Эта функция создает нового пользователя в базе данных.
        """
        # Создаем пользователя, используя наш кастомный метод create_user
        user = User.objects.create_user(
            phone_number=f"+993{validated_data['phone_number']}", # Сохраняем номер с префиксом
            password=validated_data['password']
        )
        return user