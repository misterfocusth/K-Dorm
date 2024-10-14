from exception.base_stackable_exception import StackableException
from rest_framework import status


class PermissionDenied(StackableException):
    @property
    def error_code(self) -> str:
        return "PERMISSION_DENIED"

    @property
    def error_status(self) -> int:
        return status.HTTP_401_UNAUTHORIZED
