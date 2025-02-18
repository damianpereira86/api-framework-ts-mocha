class ErrorResponse:
    def __init__(self, status: str, message: str = None, errors: list = None):
        self.status = status
        self.message = message
        self.errors = errors if errors is not None else []
