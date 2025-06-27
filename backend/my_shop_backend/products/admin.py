# backend/my_shop_backend/products/admin.py
from django.contrib import admin
from .models import Category, Product

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug')
    # Это поле будет автоматически заполняться на основе поля 'name'
    prepopulated_fields = {'slug': ('name',)} 
    search_fields = ('name',)

@admin.register(Product)
class ProductAdmin(ModelAdmin):
    list_display = ('name', 'brand', 'category', 'price', 'created_at')
    # Добавляем фильтры по категории и бренду
    list_filter = ('category', 'brand', 'created_at')
    # Добавляем поиск
    search_fields = ('name', 'description', 'brand')