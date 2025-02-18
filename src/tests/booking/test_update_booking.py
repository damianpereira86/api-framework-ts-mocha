import pytest
from src.models.services.BookingService import BookingService
from src.models.request.BookingModel import BookingModel
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

def test_update_booking_successfully(booking_service, booking_id):
    booking = BookingModel(
        firstname="Jim",
        lastname="Brown",
        totalprice=111,
        depositpaid=False,
        bookingdates={
            "checkin": "2020-01-01",
            "checkout": "2021-01-01"
        },
        additionalneeds="Lunch"
    )

    response = booking_service.update_booking(booking_id, booking)
    assert response.status == 200
    assert response.data["firstname"] == booking.firstname
    assert response.data["lastname"] == booking.lastname
    assert response.data["totalprice"] == booking.totalprice
    assert response.data["depositpaid"] is False
    assert response.data["bookingdates"]["checkin"] == booking.bookingdates["checkin"]
    assert response.data["bookingdates"]["checkout"] == booking.bookingdates["checkout"]
    assert response.data["additionalneeds"] == booking.additionalneeds

def test_update_booking_successfully_response_time(booking_service, booking_id):
    booking = BookingModel(
        firstname="Jim",
        lastname="Brown",
        totalprice=111,
        depositpaid=False,
        bookingdates={
            "checkin": "2020-01-01",
            "checkout": "2021-01-01"
        },
        additionalneeds="Lunch"
    )

    response = booking_service.update_booking(booking_id, booking)
    assert response.response_time < 1000

def test_unauthorized_update_booking(booking_id):
    unauthorized_booking_service = BookingService()
    booking = BookingModel(
        firstname="John",
        lastname="Winter",
        totalprice=500,
        depositpaid=True,
        bookingdates={
            "checkin": "2024-01-01",
            "checkout": "2024-02-01"
        },
        additionalneeds="Lunch"
    )
    response = unauthorized_booking_service.update_booking(booking_id, booking)
    assert response.status == 403

@pytest.mark.skip(reason="BUG: https://github.com/damianpereira86/api-framework-ts-mocha/issues/9")
def test_update_non_existent_booking(booking_service):
    booking_id = 999999999
    booking = BookingModel(
        firstname="John",
        lastname="Winter",
        totalprice=500,
        depositpaid=True,
        bookingdates={
            "checkin": "2024-01-01",
            "checkout": "2024-02-01"
        },
        additionalneeds="Lunch"
    )
    response = booking_service.update_booking(booking_id, booking)
    assert response.status == 404
