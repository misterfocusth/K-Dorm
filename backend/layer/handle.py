from collections.abc import Callable
from typing import (
    Concatenate,
    List,
    Literal,
    NotRequired,
    Optional,
    ParamSpec,
    Set,
    Type,
    TypedDict,
    cast,
)
from rest_framework import serializers

from exception.application_logic.client.validation import ValidationException
from exception.auth.unauthenticated import UnauthenticatedException
from exception.base_stackable_exception import StackableException
from exception.permission.base import PermissionDenied
from exception.uncaught_exception import UncaughtException
from interfaces.api_response import APIResponse
from interfaces.error_response import ErrorResponse
from interfaces.api_response import APIResponse
from interfaces.request_with_context import RequestWithContext
from api.use_case.auth import auth_uc as auth_uc
import json


class SerializerConfig(TypedDict):
    """QUERY Serialize query parameters, can also be used with other serializers"""

    QUERY: NotRequired[Type[serializers.Serializer]]
    BODY: NotRequired[Type[serializers.Serializer]]
    POST: NotRequired[Type[serializers.Serializer]]
    PUT: NotRequired[Type[serializers.Serializer]]
    PATCH: NotRequired[Type[serializers.Serializer]]


PathParams = ParamSpec("PathParams")

ROLE = Literal["STUDENT", "STAFF", "maintenance_STAFF", "SECURITY_STAFF"]

"""
    handle function decorator, places above the view function to handle the request
    the first parameter of the view function should be the request with context
"""


def handle(
    permission_checker: Optional[Callable[[RequestWithContext], bool]] = None,
    serializer_config: SerializerConfig = {},
    only_authenticated: bool = False,
    only_role: List[ROLE] = [],
):
    def decorator(
        handleFn: Callable[
            Concatenate[RequestWithContext, PathParams], APIResponse | ErrorResponse
        ]
    ):
        # transform the a request without context to a request with context
        # wrapper is compatiable with the view function
        def wrapper(
            request: RequestWithContext,
            *args: PathParams.args,
            **kwargs: PathParams.kwargs
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

                if _req.ctx.user.uid is None:
                    e = UnauthenticatedException(
                        "This route is only accessible to authenticated users"
                    )

                    return ErrorResponse(
                        status=401, error=e.error_code, message=e.message
                    )

                if len(only_role) > 0:
                    found = False
                    if "STUDENT" in only_role:
                        if auth_uc.is_student(_req, accountId=_req.ctx.user.uid):
                            found = True
                    if "STAFF" in only_role:
                        if auth_uc.is_staff(_req, accountId=_req.ctx.user.uid):
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

                    return ErrorResponse.fromException(
                        PermissionDenied("Permission denied for unknown reason")
                    )

            # serializer
            if serializer_config:
                query_serializer = serializer_config.get("QUERY")
                body_serializer = serializer_config.get("BODY")
                post_serializer = serializer_config.get("POST")
                patch_serializer = serializer_config.get("PATCH")
                put_serializer = serializer_config.get("PUT")

                SAFE_METHODS = ["GET", "HEAD", "OPTIONS"]

                try:
                    if query_serializer:
                        data = query_serializer(data=request.GET.dict())
                        if not data.is_valid():
                            raise ValidationException(
                                json.dumps(cast(dict, data.error_messages))
                            )
                        _req.ctx.store["QUERY"] = data.validated_data
                        _req.ctx.store["QUERY_serializer"] = data
                    if (
                        body_serializer
                        and request.data is not None
                        and request.method not in SAFE_METHODS
                    ):
                        data = body_serializer(data=_req.data)
                        if not data.is_valid():
                            raise ValidationException(
                                json.dumps(cast(dict, data.error_messages))
                            )
                        _req.ctx.store["BODY"] = data.validated_data
                        _req.ctx.store["BODY_serializer"] = data
                    if post_serializer and request.method == "POST":
                        data = post_serializer(data=_req.data)
                        if not data.is_valid():
                            raise ValidationException(
                                json.dumps(cast(dict, data.error_messages))
                            )
                        _req.ctx.store["BODY"] = data.validated_data
                        _req.ctx.store["BODY_serializer"] = data

                    if patch_serializer and request.method == "PATCH":
                        data = patch_serializer(data=_req.data)
                        if not data.is_valid():
                            raise ValidationException(
                                json.dumps(cast(dict, data.error_messages))
                            )
                        _req.ctx.store["BODY"] = data.validated_data
                        _req.ctx.store["BODY_serializer"] = data
                    if put_serializer and request.method == "PUT":
                        data = put_serializer(data=_req.data)
                        if not data.is_valid():
                            raise ValidationException(
                                json.dumps(cast(dict, data.error_messages))
                            )
                        _req.ctx.store["BODY"] = data.validated_data
                        _req.ctx.store["BODY_serializer"] = data

                except StackableException as e:
                    return ErrorResponse.fromException(e)

                except Exception as e:
                    return ErrorResponse(
                        status=500, error="Internal Server Error", message=str(e)
                    )
            try:
                # execute the handle function
                return handleFn(_req, *args, **kwargs)

            except StackableException as e:
                print("========STACKABLE EXCEPTION========")
                print(e.error_code)
                print(e.message)
                return ErrorResponse(
                    status=e.error_status, error=e.error_code, message=e.message
                )
            except Exception as e:
                print("========UNKNOWN EXCEPTION========")
                print(e)
                exception = UncaughtException(
                    message="Uncaught exception, internal server error"
                )
                return ErrorResponse.fromException(exception)

        return wrapper

    return decorator
