# Django REST Framework
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

# Model
from api.models import Account

# Serializers
from authentication.serializers.auth_user import AuthUserSerializer, PostAuthUserSerializer

# Create your views here.


class AuthUserView(APIView):
    def post(self, request):
        serializer = PostAuthUserSerializer(data=request.data)
        if (serializer.is_valid()):
            # TODO: Implement decode user data from session token
            return Response(status=200, data={"result": "USER_DATA"})
        return Response(status=400, data={"error": "serializer.errors", "messsage": serializer.errors})


class AuthUserDetailView(APIView):
    def get(self, request, uid):
        account = Account.objects.get(pk=uid)
        serializer = AuthUserSerializer(account)
        return Response(status=200, data={"result": serializer.data})
