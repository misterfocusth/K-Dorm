# Django REST Framework
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

# Model
from api.models import Account

# Serializers
from authentication.serializers.auth_user import AuthUserSerializer

# Create your views here.


class AuthUserDetailView(APIView):
    def get(self, request, uid):
        account = Account.objects.get(pk=uid)
        serializer = AuthUserSerializer(account)
        return Response(status=200, data={"result": serializer.data})
