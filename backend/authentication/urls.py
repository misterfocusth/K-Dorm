from django.contrib import admin
from django.urls import include, path

# API Views
import authentication.views.auth_user as auth_user_views
import authentication.views.signin as signin_views

urlpatterns = [
    path('me',
         auth_user_views.AuthUserDetailView.as_view(),
         name='getme'
         ),
    path('signin', signin_views.SignInView.as_view(), name='signin'),
]
