from abc import abstractmethod
from collections.abc import Callable

from requests import Request
from domain.models import MyBaseModel
from exception.permission.base import PermissionDenied
from exception.base_stackable_exception import StackableException
from exception.unknown_exception import UnknownException
from interfaces.context import Context
from typing import Concatenate, Optional, ParamSpec, TypeVar
from rest_framework.permissions import BasePermission
from rest_framework.views import View

from interfaces.request_with_context import RequestWithContext


P = ParamSpec("P")
R = TypeVar("R")

PermissionChecker = Callable[Concatenate[Context, P], bool]


"""
    permissionCheckers: takes list of a function that check the request permission.
    (request: RequestWithContext, *args: P.args, **kwargs: P.kwargs) -> bool
    returns True if the request is allowed, Raise exception 
"""


def usecase(
    only_authenticated: Optional[bool] = False,
    permission_checker: Optional[PermissionChecker] = None,
) -> Callable[
    [Callable[Concatenate[Context, P], R]],
    Callable[Concatenate[RequestWithContext, P], R],
]:
    def decorator(
        uc: Callable[Concatenate[Context, P], R]
    ) -> Callable[Concatenate[RequestWithContext, P], R]:
        def wrapper(
            request: RequestWithContext, *args: P.args, **kwargs: P.kwargs
        ) -> R:
            # check authentication
            if only_authenticated and (
                request.ctx.user is None or request.ctx.user.uid is None
            ):
                raise PermissionDenied("Permission denied, user is not authenticated")

            # # check permission
            if permission_checker:
                try:
                    result = permission_checker(request.ctx, *args, **kwargs)
                except PermissionDenied as e:
                    raise PermissionDenied("Permission denied, reason: " + e.message)
                except StackableException as e:
                    raise UnknownException(
                        "Something went wrong while validating request permission.", e
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
