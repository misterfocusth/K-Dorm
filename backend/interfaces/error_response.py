from rest_framework.response import Response


class ErrorResponse(Response):
    def __init__(self, message, error, data=None, status=None, **kwargs):
        if data is None:
            data = {}

        response_data = {
            'error': error,
            'message': message
        }

        super().__init__(data=response_data, status=status, **kwargs)
