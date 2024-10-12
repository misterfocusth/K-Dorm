from collections.abc import Callable

from rest_framework.request import Request
from rest_framework.response import Response

from firebase_admin import auth

from backend.repositories.account import AccountRepository


class FirebaseAuth:
    def __init__(self, get_response: Callable[[Request], Response]) -> None:
        self.get_response = get_response

    def __call__(self, request: Request):
        cookie_token = request.COOKIES.get("session_id_token")
        header_token = request.headers.get("Authorization")

        session_token = header_token.split(" ")[1] if header_token else cookie_token

        decodedToken = auth.verify_id_token(
            session_token, check_revoked=True, clock_skew_seconds=30
        )

        user = AccountRepository.get_account_by_uid(decodedToken["uid"])

        if user:
            request.ctx["user"] = user

        response = self.get_response(request)

        return response
