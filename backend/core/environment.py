import os
from typing import TypedDict

import environ
from pathlib import Path

ROOT_DIR = Path(__file__).resolve(strict=True).parent.parent.parent
print(ROOT_DIR)


class Env(TypedDict):
    WATER_COST_RATE: str
    ELECTRICITY_COST_RATE: str
    FIREBASE_ADMIN_PATH: str


def get_env(key):
    if os.path.exists(os.path.join(ROOT_DIR, ".env")):
        environ.Env.read_env(os.path.join(ROOT_DIR, ".env"))
        env = environ.Env(DEBUG=(bool, False))
        return env(key)
    else:
        return os.environ.get(key)


def strict_get_env(key: str) -> str:
    value = get_env(key)
    if value is None:
        raise ValueError(f"Environment variable {key} is not set")
    return value


env: Env = {
    "WATER_COST_RATE": strict_get_env("WATER_COST_RATE"),
    "ELECTRICITY_COST_RATE": strict_get_env("ELECTRICITY_COST_RATE"),
    "FIREBASE_ADMIN_PATH": strict_get_env("FIREBASE_ADMIN_PATH"),
}
