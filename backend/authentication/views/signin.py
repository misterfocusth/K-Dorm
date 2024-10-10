# Django REST Framework
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

# Django
from django.db import transaction

# Exceptions
from rest_framework.exceptions import AuthenticationFailed

# Model
from api.models import Account, Student

# Serializers
from authentication.serializers.auth_user import AuthUserSerializer

# Token Utils
from authentication.token import get_session_id_token

# Firebase
from firebase_admin import auth

# Django
from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User


def create_account(uid, email, first_name, last_name):
    account = Account.objects.create(
        uid=uid,
        email=email,
        firstName=first_name,
        lastName=last_name
    )
    account.save()
    return account


class SignInView(APIView):
    @transaction.atomic
    def post(self, request):
        # LOGIN AS SUPERUSER ACCOUNT
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            account = User.objects.filter(username=username).first()

            if account is None:
                created_account = create_account(
                    uid=user.uid,
                    email=user.email,
                    first_name=user.first_name,
                    last_name=user.last_name
                )
                serializer = AuthUserSerializer(created_account)

            role = "SUPERUSER"
            result = {"user": serializer.data, "role": role}
            return Response(status=status.HTTP_200_OK, data={"result": result})

        # LOGIN AS STUDENT / STAFF
        try:
            session_token = get_session_id_token(request)

            decoded_token = auth.verify_id_token(
                session_token, clock_skew_seconds=30)
            uid = decoded_token['uid']

            user = auth.get_user(uid)

            auth_user_data = {
                'uid': user.uid,
                'email': user.email,
                'display_name': user.display_name,
                'photo_url': user.photo_url,
            }

            # Check if user exists in the database
            account = Account.objects.filter(uid=uid).first()

            if account:
                serializer = AuthUserSerializer(account)
                user_data = serializer.data

                role = ""

                if user_data['student'] is not None:
                    role = "STUDENT"
                if user_data['staff'] is not None:
                    role = "STAFF"
                if user_data['maintenanceStaff'] is not None:
                    role = "MAINTENANCE_STAFF"
                if user_data['securityStaff'] is not None:
                    role = "SECURITY_STAFF"

                return Response(status=status.HTTP_200_OK, data={"result": {"user": user_data, "role": role}})

            created_account = create_account(
                uid=auth_user_data['uid'],
                email=auth_user_data['email'],
                first_name=auth_user_data['display_name'].split(" ")[0],
                last_name=auth_user_data['display_name'].split(" ")[1],
            )

            Student.objects.create(
                studentId=auth_user_data['email'].split("@")[0],
                account=created_account
            )

            created_account.refresh_from_db()

            serializer = AuthUserSerializer(created_account)
            user_data = serializer.data
            role = "STUDENT"

            return Response(status=status.HTTP_200_OK, data={"result": {"user": user_data, "role": role}})
        except AuthenticationFailed as e:
            return Response(status=status.HTTP_401_UNAUTHORIZED, data={"error": "UNAUTHORIZED", "message": str(e)})
        except Exception as e:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR, data={"error": "INTERNAL_SERVER_ERROR", "message": str(e)})
