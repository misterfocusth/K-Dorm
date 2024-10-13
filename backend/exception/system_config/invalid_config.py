from backend.exception.system_config.base import ConfigurationFailure


class InvalidConfig(ConfigurationFailure):
    @property
    def error_code(self) -> str:
        return "INVALID_CONFIG"
