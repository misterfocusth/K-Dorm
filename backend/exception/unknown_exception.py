from typing import Any

from .base_stackable_exception import StackableException


class UnknownException(StackableException):
    def __call__(self, message: str, wrapped: StackableException | None = None):
        return super().__init__(message, wrapped)
