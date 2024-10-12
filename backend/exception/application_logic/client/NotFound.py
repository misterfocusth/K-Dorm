from backend.exception.application_logic.client.base import InvalidRequestException


class NotFoundException(InvalidRequestException):
    pass
