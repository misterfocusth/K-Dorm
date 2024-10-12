from abc import abstractmethod
from collections.abc import Callable

from requests import Request
from backend.domain.models import MyBaseModel
from backend.exception.permission.base import PermissionDenied
from backend.exception.base_stackable_exception import StackableException
from backend.exception.unknown_exception import UnknownException
from backend.interfaces.context import Context
from typing import Concatenate, Optional, ParamSpec, TypeVar
from rest_framework.permissions import BasePermission
from rest_framework.views import View

from backend.interfaces.request_with_context import RequestWithContext

P = ParamSpec("P")
R = TypeVar("R")


"""
    permissionCheckers: takes list of a function that check the request permission.
    (request: RequestWithContext, *args: P.args, **kwargs: P.kwargs) -> bool
    returns True if the request is allowed, Raise exception 
"""


def usecase(
    permissionChecker: Optional[
        Callable[Concatenate[RequestWithContext, P], bool]
    ] = None
):
    def decorator(uc: Callable[Concatenate[Context, P], R]):
        def wrapper(
            request: RequestWithContext, *args: P.args, **kwargs: P.kwargs
        ) -> R:
            # check permission
            if permissionChecker:
                try:
                    result = permissionChecker(request, *args, **kwargs)
                except PermissionDenied as e:
                    raise PermissionDenied("Permission denied, reason: " + e.message)
                except StackableException as e:
                    raise UnknownException(
                        "Something went wrong while validating request permission.",
                        e.message,
                    )
                except Exception as e:
                    raise UnknownException(
                        "Something went wrong while validating request permission.", e
                    )

                if not result:
                    raise PermissionDenied("Permission denied due to unknown reason")

            # execute the use case
            return uc(request.ctx, *args, **kwargs)

        return wrapper

    return decorator


ObjectType = TypeVar("ObjectType", bound=MyBaseModel)
