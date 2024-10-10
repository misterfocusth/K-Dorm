from rest_framework.response import Response


class APIResponse(Response):
    def __init__(self, data=None, status=None, template_name=None, headers=None, exception=False, content_type=None):
        super().__init__(data, status, template_name, headers, exception, content_type)
        self.data = {
            'result': data
        }
        self.status = status
        self.template_name = template_name
        self.headers = headers
        self.exception = exception
        self.content_type = content_type
