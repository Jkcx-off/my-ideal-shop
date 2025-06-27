# backend/my_shop_backend/orders/admin.py
from django.contrib import admin
from .models import Order, OrderItem

class OrderItemInline(admin.TabularInline):
    model = OrderItem
    raw_id_fields = ['product']
    extra = 0
    readonly_fields = ('price',)

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'customer_name', 'customer_phone', 'status', 'total_price', 'created_at', 'user')
    list_filter = ('status', 'created_at')
    search_fields = ('id', 'customer_name', 'customer_phone')
    list_editable = ('status',)
    inlines = [OrderItemInline]