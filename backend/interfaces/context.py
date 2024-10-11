from api.models import Account
from rest_framework.request import Request


class Context:
    """
    account: As a requester account model
    store: As an any dictionary for storing data
    """

    def __init__(self, account: Account = None, store: dict = {}):
        self.user = account
        self.store = store
