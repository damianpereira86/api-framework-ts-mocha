import pytest
from src.models.services.BookingService import BookingService
from src.models.responses.BookingResponse import BookingResponse

@pytest.fixture
def booking_service():
    service = BookingService()
    service.authenticate()
    return service

@pytest.fixture
def booking_id(booking_service):
    response = booking_service.add_booking({
        "firstname": "John",
        "lastname": "Snow",
        "totalprice": 1000,
        "depositpaid": True,
        "bookingdates": {
            "checkin": "2024-01-01",
            "checkout": "2024-02-01"
        },
        "additionalneeds": "Breakfast"
    })
    return response.data["bookingid"]

def test_delete_booking_successfully(booking_service, booking_id):
    response = booking_service.delete_booking(booking_id)
    assert response.status == 201

    get_response = booking_service.get_booking(booking_id)
    assert get_response.status == 404

def test_delete_booking_successfully_response_time(booking_service, booking_id):
    response = booking_service.delete_booking(booking_id)
    assert response.response_time < 1000

@pytest.mark.skip(reason="BUG: https://github.com/damianpereira86/api-framework-ts-mocha/issues/6")
def test_delete_booking_successfully_status_code(booking_service, booking_id):
    response = booking_service.delete_booking(booking_id)
    assert response.status == 204

def test_unauthorized_delete_booking(booking_id):
    unauthorized_booking_service = BookingService()
    response = unauthorized_booking_service.delete_booking(booking_id)
    assert response.status == 403

@pytest.mark.skip(reason="BUG: https://github.com/damianpereira86/api-framework-ts-mocha/issues/7")
def test_delete_non_existent_booking(booking_service):
    booking_id = 999999999
    response = booking_service.delete_booking(booking_id)
    assert response.status == 404
