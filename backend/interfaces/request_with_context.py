from typing import Optional
from interfaces.context import Context
from rest_framework.request import Request


class RequestWithContext(Request):

    def __init__(self, request: Request, ctx: Context | None = None):
        super().__init__(request)
        if ctx is None:
            ctx = Context()  # Default context
        self.ctx = ctx

    @staticmethod
    def init(request: Request, ctx: Optional[Context] = None) -> Request:
        if ctx is None:
            ctx = Context()  # Default context

        request.ctx = ctx  # type: ignore
        return request
