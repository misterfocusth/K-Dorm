from __future__ import annotations


class StackableException(Exception):
    def __init__(self, message: str, wrapped: StackableException = None):
        if wrapped is not None:
            self.message = message + ":" + wrapped.message
        else:
            self.message = message
        super().__init__(self.message)

    def __str__(self) -> str:
        return self.message
