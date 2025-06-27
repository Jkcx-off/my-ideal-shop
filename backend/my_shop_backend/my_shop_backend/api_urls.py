from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    # Явно указываем пространство имен для каждого приложения
    path('products/', include('products.urls')),
    path('orders/', include('orders.urls')),
    path('users/', include('users.urls')),
    path('auth/', include('authentication.urls')),
    path('favorites/', include('favorites.urls')), # Маршрут для "Избранного"

    # Маршруты для входа (получения токенов)
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]