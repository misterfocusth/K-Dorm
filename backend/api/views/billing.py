from collections.abc import Callable
from typing import ParamSpec, TypeVar
from rest_framework.decorators import api_view

from interfaces.request_with_context import RequestWithContext
from layer.handle import handle


# @api_view(['GET'])
# @handle()
# def get_list_billing(request: RequestWithContext):
