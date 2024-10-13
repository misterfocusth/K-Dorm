from __future__ import annotations

from abc import ABC, abstractmethod
from typing import Literal

from rest_framework import status

"""
@private , Internal use within exception module
"""


class StackableException(Exception, ABC):
    """
    message: takes a message as a string like a normal exception
    wrapped: takes an previous exception for rethrowing, the class will automatically chain the messages

    overrideable properties:
    error_code: the error code of the exception -> string (default "MISSING_ERROR_CODE")
    error_status: the http status code of the exception -> int (default 500)
    """

    @property
    @abstractmethod
    def error_code(self) -> str:
        return "MISSING_ERROR_CODE"

    @property
    def error_status(self) -> int:
        return status.HTTP_500_INTERNAL_SERVER_ERROR

    def __init__(self, message: str, wrapped: Exception | None = None):
        if wrapped is not None:
            self.wrapped = wrapped
            self.message = message + ":" + wrapped.__str__()
        else:
            self.message = message
        super().__init__(self.message)

    def __str__(self) -> str:
        return self.message
