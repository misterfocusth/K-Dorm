from typing import TypedDict
from backend.interfaces.context import Context
from backend.layer.use_case import usecase
from serializers.account_serializer import UpdateSerializer
from rest_framework.request import Request
from interfaces.request_with_context import RequestWithContext
from api.repository.account import AccountRepository


class EditStaffPayload(TypedDict):
    firstName: str
    lastName: str


@usecase(only_authenticated=True)
def edit(ctx: Context, serializer, id: int):
    validated_data = serializer.validated_data

    account = AccountRepository.get_account_by_id(id=id)

    if account is None:
        return None

    account.firstName = validated_data["firstName"]
    account.lastName = validated_data["lastName"]
    account.isDisabled = validated_data["isDisabled"]

    # set null current binded google account uid
    if validated_data["email"] != account.email:
        print("email changed", validated_data["email"], account.email)
        account.uid = None

    account.email = validated_data["email"]

    account.save()
    return account
