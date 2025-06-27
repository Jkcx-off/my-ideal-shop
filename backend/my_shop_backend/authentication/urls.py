from django.urls import path
from .views import RegisterView

urlpatterns = [
    # Говорим, что путь 'register/' внутри нашего приложения
    # должен обрабатываться классом RegisterView
    path('register/', RegisterView.as_view(), name='auth_register'),
]