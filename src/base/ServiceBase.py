import os
from src.base.ApiClient import ApiClient
from src.base.SessionManager import SessionManager
from src.models.request.CredentialsModel import CredentialsModel
from src.models.responses.Response import Response

class ServiceBase:
    def __init__(self, endpoint_path: str):
        self.api = ApiClient()
        self.url = self.base_url + endpoint_path
        self.default_config = {}

    @property
    def base_url(self) -> str:
        return os.getenv("BASEURL", "")

    def authenticate(self) -> None:
        username = os.getenv("USER")
        password = os.getenv("PASSWORD")

        if not username or not password:
            raise ValueError("Missing username or password in environment variables.")

        cached_token = SessionManager.get_cached_token(username, password)

        if cached_token:
            self.default_config = {
                "headers": {"Cookie": "token=" + cached_token},
            }
            return

        credentials = CredentialsModel(username=username, password=password)
        response = self.post(f"{self.base_url}/auth", credentials)

        SessionManager.store_token(username, password, response.data.token)

        self.default_config = {
            "headers": {"Cookie": "token=" + response.data.token},
        }

    def get(self, url: str, config: dict = None) -> Response:
        if config is None:
            config = self.default_config
        start_time = self._get_current_time()
        response = self.api.client.get(url, **config)
        end_time = self._get_current_time()
        return self._build_response(end_time, start_time, response)

    def post(self, url: str, data: dict, config: dict = None) -> Response:
        if config is None:
            config = self.default_config
        start_time = self._get_current_time()
        response = self.api.client.post(url, json=data, **config)
        end_time = self._get_current_time()
        return self._build_response(end_time, start_time, response)

    def put(self, url: str, data: dict, config: dict = None) -> Response:
        if config is None:
            config = self.default_config
        start_time = self._get_current_time()
        response = self.api.client.put(url, json=data, **config)
        end_time = self._get_current_time()
        return self._build_response(end_time, start_time, response)

    def patch(self, url: str, data: dict, config: dict = None) -> Response:
        if config is None:
            config = self.default_config
        start_time = self._get_current_time()
        response = self.api.client.patch(url, json=data, **config)
        end_time = self._get_current_time()
        return self._build_response(end_time, start_time, response)

    def delete(self, url: str, config: dict = None) -> Response:
        if config is None:
            config = self.default_config
        start_time = self._get_current_time()
        response = self.api.client.delete(url, **config)
        end_time = self._get_current_time()
        return self._build_response(end_time, start_time, response)

    def head(self, url: str, config: dict = None) -> Response:
        if config is None:
            config = self.default_config
        start_time = self._get_current_time()
        response = self.api.client.head(url, **config)
        end_time = self._get_current_time()
        return self._build_response(end_time, start_time, response)

    def options(self, url: str, config: dict = None) -> Response:
        if config is None:
            config = self.default_config
        start_time = self._get_current_time()
        response = self.api.client.options(url, **config)
        end_time = self._get_current_time()
        return self._build_response(end_time, start_time, response)

    def _build_response(self, end_time: int, start_time: int, response) -> Response:
        response_time = end_time - start_time
        return Response(
            data=response.json(),
            status=response.status_code,
            headers=response.headers,
            response_time=response_time,
        )

    def _get_current_time(self) -> int:
        from time import time
        return int(time() * 1000)
