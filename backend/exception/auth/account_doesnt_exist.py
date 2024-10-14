from rest_framework import status
from exception.auth.base import AuthenticationFailure


class AccountDoesntExistException(AuthenticationFailure):

    @property
    def error_status(self):
        return status.HTTP_401_UNAUTHORIZED

    @property
    def error_code(self):
        return "NO_ACCOUNT_IN_SYSTEM"
