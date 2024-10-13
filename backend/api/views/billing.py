# from collections.abc import Callable
# from typing import ParamSpec, TypeVar
# from rest_framework.decorators import api_view

# from backend.interfaces.request_with_context import RequestWithContext
# from backend.layer.handle import handle


# # @api_view(['GET'])
# # @handle()
# # def get_list_billing(request: RequestWithContext):


# P = ParamSpec("P")
# R = TypeVar("R")


# def call_func(func: Callable[P, R], *args: P.args, **kwargs: P.kwargs) -> R:
#     return func(*args)


# def function_(a: int, b: str) -> None:
#     pass


# call_func(function_, 1, "")  # OK
# call_func(function_, 1, b="")  # Unexpected keyword argument "b"

from collections.abc import Callable
from typing import Concatenate, Optional, ParamSpec, TypeVar


S = TypeVar("S")
P = ParamSpec("P")
R = TypeVar("R")


def with_event(
    method: Callable[Concatenate[P], R]
) -> Callable[Concatenate[Optional[str], P], R]:
    def wrapper(event: Optional[str] = None, *args: P.args, **kwargs: P.kwargs) -> R:
        print(f"event was {event}")
        return method(*args, **kwargs)

    return wrapper


@with_event
def write(number: int = 0) -> str:
    return f"number was {number}"


print(write("my event", number=5))
