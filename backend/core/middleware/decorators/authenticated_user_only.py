from functools import wraps
from rest_framework import status

# Firebase
from firebase_admin import auth

# Models
from domain.models import Account

# Utils
from utils.token import get_session_id_token

# Exceptions
from rest_framework.exceptions import AuthenticationFailed

# Interface
from interfaces.error_response import ErrorResponse


def authenticated_user_only(view_func):
    @wraps(view_func)
    def _wrapped_view_func(request, *args, **kwargs):
        try:
            session_id_token = get_session_id_token(request)
            decoded_token = auth.verify_id_token(
                session_id_token, clock_skew_seconds=30)

            uid = decoded_token["uid"]

            account = Account.objects.filter(uid=uid).first()

            request.user = account

            if session_id_token:
                return view_func(request, *args, **kwargs)
            else:
                return ErrorResponse(
                    error="UNAUTHORIZED",
                    message="UNAUTHORIZED!",
                    status=status.HTTP_401_UNAUTHORIZED,
                )

        except auth.ExpiredIdTokenError:
            return ErrorResponse(
                error="UNAUTHORIZED",
                message="Expired Session ID Token!",
                status=status.HTTP_401_UNAUTHORIZED,
            )
        except auth.RevokedIdTokenError:
            return ErrorResponse(
                error="UNAUTHORIZED",
                message="Revoked Session ID Token!",
                status=status.HTTP_401_UNAUTHORIZED,
            )
        except AuthenticationFailed as e:
            return ErrorResponse(
                error="UNAUTHORIZED",
                message=str(e),
                status=status.HTTP_401_UNAUTHORIZED,
            )

    return _wrapped_view_func
