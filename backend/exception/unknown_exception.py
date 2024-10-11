from typing import Any

from .stackable_exception import StackableException


class UnknownException(StackableException):
    def __call__(self, message: str, wrapped: StackableException = None):
        return super().__call__(message, wrapped)
