from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    # 1. Путь к админ-панели
    path('admin/', admin.site.urls),

    # 2. Единственный путь для всего нашего API, который ведет в отдельный файл
    path('api/', include('my_shop_backend.api_urls')),
]