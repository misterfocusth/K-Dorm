from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path('admin/', admin.site.urls),

    # Authentication Routes
    path('api/auth/', include('authentication.urls')),

    # API Routes
    path('api/', include('api.urls')),
]
