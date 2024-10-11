from functools import wraps
from django.http import JsonResponse
from rest_framework import status

# Firebase
from firebase_admin import auth

# Models
from domain.models import Account

# TODO: Fix this, idk why it's not working properly :(

"""
Deprecated, Wait for sila to migrate
"""


def authenticated_user_only(view_func):
    @wraps(view_func)
    def _wrapped_view_func(request, *args, **kwargs):
        try:
            session_id_token = request.COOKIES.get("session_id_token")
            decoded_token = auth.verify_id_token(session_id_token)

            uid = decoded_token["uid"]

            account = Account.objects.filter(uid=uid).first()

            request.user = account

            if session_id_token:
                return view_func(request, *args, **kwargs)
            else:
                return JsonResponse(
                    {"error": "HTTP_401_UNAUTHORIZED", "message": "UNAUTHORIZED!"},
                    status=status.HTTP_401_UNAUTHORIZED,
                )

        except auth.InvalidIdTokenError:
            return JsonResponse(
                {
                    "error": "HTTP_401_UNAUTHORIZED",
                    "message": "Invalid Session ID Token!",
                },
                status=status.HTTP_401_UNAUTHORIZED,
            )
        except auth.ExpiredIdTokenError:
            return JsonResponse(
                {
                    "error": "HTTP_401_UNAUTHORIZED",
                    "message": "Expired Session ID Token!",
                },
                status=status.HTTP_401_UNAUTHORIZED,
            )
        except auth.RevokedIdTokenError:
            return JsonResponse(
                {
                    "error": "HTTP_401_UNAUTHORIZED",
                    "message": "Revoked Session ID Token!",
                },
                status=status.HTTP_401_UNAUTHORIZED,
            )

    return _wrapped_view_func
