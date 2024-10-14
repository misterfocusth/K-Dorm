from collections.abc import Callable
from rest_framework.request import Request
from rest_framework.response import Response

from interfaces.context import Context
from interfaces.request_with_context import RequestWithContext


class InitContext:
    def __init__(self, get_response: Callable[[RequestWithContext], Response]) -> None:
        self.get_response = get_response

    def __call__(self, request):

        ctx = Context(None, {})
        extended_request = RequestWithContext.init(request)

        response = self.get_response(extended_request)  # type: ignore
        return response
