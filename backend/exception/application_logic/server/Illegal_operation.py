class IllegalOperationException(Exception):

    @property
    def error_status(self):
        return 500

    @property
    def error_message(self):
        return "ILLEGAL_OPERATION"
