from collections.abc import Callable
from typing import (
    Concatenate,
    List,
    Literal,
    Optional,
    ParamSpec,
    Set,
    Tuple,
    Type,
    cast,
)
from rest_framework.request import Request
from rest_framework.views import APIView
from rest_framework import serializers

from backend.api.use_case.auth.is_staff import is_staff
from backend.api.use_case.auth.is_student import is_student
from backend.exception import unknown_exception
from backend.exception.application_logic.client.validation import ValidationException
from backend.exception.auth.unauthenticated import UnauthenticatedException
from backend.exception.base_stackable_exception import StackableException
from backend.exception.permission.base import PermissionDenied
from backend.interfaces.api_response import APIResponse
from backend.interfaces.error_response import ErrorResponse
from backend.interfaces.api_response import APIResponse
from backend.interfaces.context import Context
from backend.interfaces.request_with_context import RequestWithContext
from backend.exception.unknown_exception import UnknownException
from api.use_case.auth import uc as auth_uc
from backend.repositories import account

PathParams = ParamSpec("PathParams")


ROLE = Literal["STUDENT", "STAFF", "MAINTERNANCE_STAFF", "SECURITY_STAFF"]

"""
    handle function decorator, places above the view function to handle the request
    the first parameter of the view function should be the request with context
"""


def handle(
    permission_checker: Optional[Callable[[RequestWithContext], bool]] = None,
    Serializer: Optional[Type[serializers.Serializer]] = None,
    only_authenticated: bool = False,
    only_role: List[ROLE] = [],
):
    def decorator(
        handleFn: Callable[Concatenate[RequestWithContext, PathParams], APIResponse]
    ):
        # transform the a request without context to a request with context
        # wrapper is compatiable with the view function
        def wrapper(
            request: Request, *args: PathParams.args, **kwargs: PathParams.kwargs
        ):
            if request.ctx is None:
                _req: RequestWithContext = RequestWithContext(request)

            _req = cast(RequestWithContext, request)

            # check authenticated
            if only_authenticated or len(only_role) > 0:
                if not _req.ctx.user:

                    e = UnauthenticatedException(
                        "This route is only accessible to authenticated users"
                    )

                    return ErrorResponse(
                        status=401, error=e.error_code, message=e.message
                    )

                if len(only_role) > 0:
                    found = False
                    if "STUDENT" in only_role:
                        if is_student(_req, accountId=_req.ctx.user.uid):
                            found = True
                    if "STAFF" in only_role:
                        if is_staff(_req, accountId=_req.ctx.user.uid):
                            found = True
                    # TOOD: The rest roles

                    if not found:
                        unauthticated = UnauthenticatedException(
                            "User's request not met any role required"
                        )
                        return ErrorResponse(
                            status=unauthticated.error_status,
                            error=unauthticated.error_code,
                            message=unauthticated.message,
                        )

            # check permission
            if permission_checker:
                try:
                    result = permission_checker(_req)
                except PermissionDenied as e:
                    return ErrorResponse(e.message, e.error_code, status=e.error_status)
                except Exception as e:
                    return ErrorResponse(
                        status=500, error="Internal Server Error", message=str(e)
                    )

                if not result:
                    return ErrorResponse(
                        status=403,
                        error="Forbidden",
                        message="Permission denied for unknown reason",
                    )

            # serializer
            if Serializer:
                try:
                    data = Serializer(data=_req.data)

                    if not data.is_valid():

                        exception = ValidationException("")

                        return ErrorResponse(
                            status=exception.error_status,
                            error=exception.error_code,
                            message=data.error_messages,
                        )

                    # inject into ctx store
                    _req.ctx.store["validated_data"] = data.validated_data
                    _req.ctx.store["handle_serializer"] = data

                except StackableException as e:

                    return ErrorResponse(
                        status=e.error_status,
                        error=e.error_code,
                        message=e.message,
                    )

                except Exception as e:

                    unknown_exception = UnknownException(
                        "Something went wrong while trying to parse payload"
                    )

                    return ErrorResponse(
                        status=unknown_exception.error_status,
                        error=unknown_exception.error_code,
                        message=unknown_exception.message,
                    )

            try:
                # execute the handle function
                return handleFn(_req, *args, **kwargs)
            except StackableException as e:
                return ErrorResponse(
                    status=e.error_status, error=e.error_code, message=e.message
                )

        return wrapper

    return decorator
