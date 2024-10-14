from interfaces.context import Context
from rest_framework.request import Request


class RequestWithContext(Request):
    def __init__(self, request: Request, ctx: Context | None = None):
        super().__init__(request)
        if ctx is None:
            ctx = Context()  # Default context
        self.ctx = ctx
