from backend.exception.base_stackable_exception import StackableException
from backend.exception.system_config.base import ConfigurationFailure


class ConfigNotFound(ConfigurationFailure):
    pass
