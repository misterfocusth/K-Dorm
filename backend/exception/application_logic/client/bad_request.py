from xml.sax.handler import property_encoding
from backend.exception.application_logic.client.base import InvalidRequestException


class BadRequestException(InvalidRequestException):

    @property
    def error_code(self) -> str:
        return "BAD_REQUEST"

    @property
    def status_code(self) -> int:
        return 400
