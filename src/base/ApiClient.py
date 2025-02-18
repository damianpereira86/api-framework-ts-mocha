from src.base.ApiClientBase import ApiClientBase

class ApiClient(ApiClientBase):
    _instance = None

    def __new__(cls, *args, **kwargs):
        if not cls._instance:
            cls._instance = super(ApiClient, cls).__new__(cls, *args, **kwargs)
        return cls._instance

    def __init__(self):
        super().__init__()
