import pytest
from src.models.services.BookingService import BookingService
from src.models.request.BookingModel import BookingModel
from src.models.responses.BookingResponse import BookingResponse

@pytest.fixture
def booking_service():
    return BookingService()

@pytest.fixture
def created_booking(booking_service):
    booking = BookingModel(
        firstname="Damian",
        lastname="Pereira",
        totalprice=1000,
        depositpaid=True,
        bookingdates={
            "checkin": "2024-01-01",
            "checkout": "2024-02-01"
        },
        additionalneeds="Breakfast"
    )
    response = booking_service.add_booking(booking)
    return response

def test_get_booking_successfully(booking_service, created_booking):
    booking_id = created_booking.data["bookingid"]
    response = booking_service.get_booking(booking_id)
    assert response.status == 200
    assert response.data["firstname"] == created_booking.data["booking"]["firstname"]
    assert response.data["lastname"] == created_booking.data["booking"]["lastname"]
    assert response.data["totalprice"] == created_booking.data["booking"]["totalprice"]
    assert response.data["depositpaid"] is True
    assert response.data["bookingdates"]["checkin"] == created_booking.data["booking"]["bookingdates"]["checkin"]
    assert response.data["bookingdates"]["checkout"] == created_booking.data["booking"]["bookingdates"]["checkout"]
    assert response.data["additionalneeds"] == created_booking.data["booking"]["additionalneeds"]

def test_get_booking_successfully_response_time(booking_service, created_booking):
    booking_id = created_booking.data["bookingid"]
    response = booking_service.get_booking(booking_id)
    assert response.response_time < 1000

def test_get_non_existent_booking(booking_service):
    booking_id = 999999999
    response = booking_service.get_booking(booking_id)
    assert response.status == 404
