import requests

class ApiClientBase:
    def __init__(self):
        self.client = requests.Session()
        self.client.headers.update({
            "Content-Type": "application/json",
            "Accept": "application/json"
        })
        self.client.hooks['response'].append(self.validate_status)

    def validate_status(self, response, *args, **kwargs):
        response.raise_for_status()
        return response
