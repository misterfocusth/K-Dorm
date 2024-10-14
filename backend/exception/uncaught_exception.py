from rest_framework.status import HTTP_500_INTERNAL_SERVER_ERROR
from backend.exception.base_stackable_exception import StackableException


class UncaughtException(StackableException):
    @property
    def error_code(self):
        return "UNCAUGHT_EXCEPTION"

    @property
    def error_status(self):
        return HTTP_500_INTERNAL_SERVER_ERROR
