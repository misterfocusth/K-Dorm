from rest_framework.response import Response


class APIResponse(Response):
    def __init__(self, data=None, status=None, **kwargs):
        if data is None:
            data = {}

        responses_data = {"result": data}

        super().__init__(data=responses_data, status=status, **kwargs)
