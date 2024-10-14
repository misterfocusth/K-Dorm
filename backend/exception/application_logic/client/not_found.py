from rest_framework import status
from backend.exception.application_logic.client.base import InvalidRequestException


class NotFoundException(InvalidRequestException):
    @property
    def error_code(self):
        return "NOT_FOUND"

    @property
    def error_status(self):
        return status.HTTP_404_NOT_FOUND
