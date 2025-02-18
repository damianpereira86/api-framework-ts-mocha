from src.base.ServiceBase import ServiceBase
from src.models.request.BookingModel import BookingModel
from src.models.responses.Response import Response

class BookingService(ServiceBase):
    def __init__(self):
        super().__init__("/booking")

    def get_booking_ids(self, params: dict = None, config: dict = None) -> Response:
        if config is None:
            config = self.default_config
        if params:
            config["params"] = params
        return self.get(self.url, config)

    def get_booking(self, booking_id: int, config: dict = None) -> Response:
        if config is None:
            config = self.default_config
        return self.get(f"{self.url}/{booking_id}", config)

    def add_booking(self, booking: BookingModel, config: dict = None) -> Response:
        if config is None:
            config = self.default_config
        return self.post(self.url, booking, config)

    def update_booking(self, booking_id: int, booking: BookingModel, config: dict = None) -> Response:
        if config is None:
            config = self.default_config
        return self.put(f"{self.url}/{booking_id}", booking, config)

    def partial_update_booking(self, booking_id: int, booking: BookingModel, config: dict = None) -> Response:
        if config is None:
            config = self.default_config
        return self.patch(f"{self.url}/{booking_id}", booking, config)

    def delete_booking(self, booking_id: int, config: dict = None) -> Response:
        if config is None:
            config = self.default_config
        return self.delete(f"{self.url}/{booking_id}", config)
