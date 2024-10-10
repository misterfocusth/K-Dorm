# Django REST Framework
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

# Django
from django.db import transaction

# Exceptions
from rest_framework.exceptions import AuthenticationFailed

# Model
from domain.models import Account, Student, Staff

# Serializers
from authentication.serializers.auth_user import AuthUserSerializer

# Token Utils
from authentication.token import get_session_id_token

# Firebase
from firebase_admin import auth


class SignInView(APIView):
    def get_user_role(self, user_data):
        role = ""

        if user_data['student'] is not None:
            role = "STUDENT"
        if user_data['staff'] is not None:
            role = "STAFF"
        if user_data['maintenanceStaff'] is not None:
            role = "MAINTENANCE_STAFF"
        if user_data['securityStaff'] is not None:
            role = "SECURITY_STAFF"

        return role

    @transaction.atomic
    def create_new_account(self, auth_user_data, is_student=False, is_system_admin=False):
        first_name, last_name = "", ""

        if auth_user_data["display_name"] is not None:
            first_name = auth_user_data['display_name'].split(" ")[0]
            last_name = auth_user_data['display_name'].split(" ")[1]
        else:
            first_name = "System"
            last_name = "Admin"

        account = Account.objects.create(
            uid=auth_user_data['uid'],
            email=auth_user_data['email'],
            firstName=first_name,
            lastName=last_name,
        )
        account.save()

        if is_student:
            Student.objects.create(
                studentId=auth_user_data['email'].split("@")[0],
                account=account
            )

        if is_system_admin:
            Staff.objects.create(
                account=account
            )

        return account

    @transaction.atomic
    def post(self, request):
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

            if account is None and auth_user_data['email'] == 'admin@kmitl.ac.th':
                self.create_new_account(
                    auth_user_data=auth_user_data, is_system_admin=True)
            elif account is None:
                account = self.create_new_account(
                    auth_user_data=auth_user_data, is_student=True)

            serializer = AuthUserSerializer(account)
            user_data = serializer.data
            role = self.get_user_role(user_data)

            return Response(status=status.HTTP_200_OK, data={"result": {"user": user_data, "role": role}})
        except AuthenticationFailed as e:
            return Response(status=status.HTTP_401_UNAUTHORIZED, data={"error": "UNAUTHORIZED", "message": str(e)})
        except Exception as e:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR, data={"error": "INTERNAL_SERVER_ERROR", "message": str(e)})
