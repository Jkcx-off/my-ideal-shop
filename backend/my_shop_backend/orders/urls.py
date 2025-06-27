# backend/my_shop_backend/orders/urls.py
from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import OrderViewSet, OrderHistoryView

router = DefaultRouter()
router.register(r'', OrderViewSet, basename='order')

urlpatterns = [
    path('my-orders/', OrderHistoryView.as_view(), name='my-orders'),
]

urlpatterns += router.urls