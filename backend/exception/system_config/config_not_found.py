from exception.base_stackable_exception import StackableException
from exception.system_config.base import ConfigurationFailure


class ConfigNotFound(ConfigurationFailure):
    @property
    def error_code(self) -> str:
        return "CONFIG_NOT_FOUND"
