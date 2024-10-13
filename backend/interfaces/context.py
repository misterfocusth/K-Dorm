from backend.domain.models import Account


class Context:
    """
    account: As a requester account model
    store: As an any dictionary for storing data
    """

    def __init__(self, account: Account | None = None, store: dict = {}):
        self.user = account
        self.store = store
