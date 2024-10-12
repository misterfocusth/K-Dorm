from __future__ import annotations

"""
@private , Internal use within exception module
"""


class StackableException(Exception):
    """
    message: takes a message as a string like a normal exception
    wrapped: takes an previous exception for rethrowing, the class will automatically chain the messages
    """

    def __init__(self, message: str, wrapped: Exception | None = None):
        if wrapped is not None:
            self.wrapped = wrapped
            self.message = message + ":" + wrapped.__str__()
        else:
            self.message = message
        super().__init__(self.message)

    def __str__(self) -> str:
        return self.message
