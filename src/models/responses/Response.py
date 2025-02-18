class Response:
    def __init__(self, data, status, headers, response_time):
        self.data = data
        self.status = status
        self.headers = headers
        self.response_time = response_time
