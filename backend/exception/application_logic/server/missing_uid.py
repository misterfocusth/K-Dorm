from exception.application_logic.server.base import UnexpectedException


class MissingUIDException(UnexpectedException):
    @property
    def error_code(self):
        return "MISSING_UID"
