from typing import TypedDict
from backend.core.settings import get_env


class Env(TypedDict):
    WATER_RATE: str
    ELECTRICITY_RATE: str


def strict_get_env(key: str) -> str:
    value = get_env(key)
    if value is None:
        raise ValueError(f"Environment variable {key} is not set")
    return value


env: Env = {
    "WATER_RATE": strict_get_env("WATER_RATE"),
    "ELECTRICITY_RATE": strict_get_env("ELECTRICITY_RATE"),
}
