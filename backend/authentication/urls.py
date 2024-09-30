from django.contrib import admin
from django.urls import include, path

# API Views
import authentication.views.auth_user as auth_user_views

urlpatterns = [
    path('auth/<int:uid>', auth_user_views.AuthUserView.as_view(), name='auth_user'),
]
