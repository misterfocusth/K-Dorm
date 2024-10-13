from serializers.account_serializer import UpdateSerializer
from rest_framework.request import Request
from repositories.account_repository import get_account_by_id


def handle_edit_staff_account(request: Request, serializer: type[UpdateSerializer], id: int):
    validated_data = serializer.validated_data

    account = get_account_by_id(id=id)

    account.firstName = validated_data['firstName']
    account.lastName = validated_data['lastName']
    account.isDisabled = validated_data['isDisabled']
    account.email = validated_data['email']

    account.save()
    return account
