# backend/my_shop_backend/orders/views.py
from rest_framework import viewsets, status, generics
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.db import transaction
from .models import Order, OrderItem
from products.models import Product
from .serializers import CreateOrderSerializer, OrderHistorySerializer

class OrderHistoryView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = OrderHistorySerializer

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user).order_by('-created_at')

class OrderViewSet(viewsets.ViewSet):
    permission_classes = [AllowAny]
    serializer_class = CreateOrderSerializer

    @transaction.atomic
    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        validated_data = serializer.validated_data
        items_data = validated_data.pop('items')
        
        order_creation_data = { **validated_data, 'total_price': 0 }
        
        if request.user.is_authenticated:
            order_creation_data['user'] = request.user
        
        order = Order.objects.create(**order_creation_data)
        
        total_price = 0
        order_items_to_create = []

        for item_data in items_data:
            try:
                product = Product.objects.get(id=item_data['product_id'])
                item_price = product.price
                total_price += item_price * item_data['quantity']
                order_items_to_create.append(
                    OrderItem(order=order, product=product, quantity=item_data['quantity'], price=item_price)
                )
            except Product.DoesNotExist:
                raise serializers.ValidationError({'error': f"Товар с ID {item_data['product_id']} не найден."})
        
        OrderItem.objects.bulk_create(order_items_to_create)
        order.total_price = total_price
        order.save()

        return Response({'status': 'success', 'order_id': order.id}, status=status.HTTP_201_CREATED)