import pytest
from src.models.services.BookingService import BookingService
from src.models.request.BookingModel import BookingModel
from src.models.responses.BookingResponse import BookingResponse

@pytest.fixture
def booking_service():
    return BookingService()

def test_add_booking_successfully(booking_service):
    booking = BookingModel(
        firstname="Jim",
        lastname="Brown",
        totalprice=111,
        depositpaid=True,
        bookingdates={
            "checkin": "2020-01-01",
            "checkout": "2021-01-01"
        },
        additionalneeds="Breakfast"
    )

    response = booking_service.add_booking(booking)
    assert response.status == 200
    assert isinstance(response.data["bookingid"], int)
    assert response.data["booking"]["firstname"] == booking.firstname
    assert response.data["booking"]["lastname"] == booking.lastname
    assert response.data["booking"]["totalprice"] == booking.totalprice
    assert response.data["booking"]["depositpaid"] is True
    assert response.data["booking"]["bookingdates"]["checkin"] == booking.bookingdates["checkin"]
    assert response.data["booking"]["bookingdates"]["checkout"] == booking.bookingdates["checkout"]
    assert response.data["booking"]["additionalneeds"] == booking.additionalneeds

def test_add_booking_successfully_response_time(booking_service):
    booking = BookingModel(
        firstname="Jim",
        lastname="Brown",
        totalprice=111,
        depositpaid=True,
        bookingdates={
            "checkin": "2020-01-01",
            "checkout": "2021-01-01"
        },
        additionalneeds="Breakfast"
    )

    response = booking_service.add_booking(booking)
    assert response.response_time < 1000

@pytest.mark.skip(reason="BUG: https://github.com/damianpereira86/api-framework-ts-mocha/issues/4")
def test_add_booking_successfully_status_code(booking_service):
    booking = BookingModel(
        firstname="Jim",
        lastname="Brown",
        totalprice=111,
        depositpaid=True,
        bookingdates={
            "checkin": "2020-01-01",
            "checkout": "2021-01-01"
        },
        additionalneeds="Breakfast"
    )

    response = booking_service.add_booking(booking)
    assert response.status == 201

@pytest.mark.skip(reason="BUG: https://github.com/damianpereira86/api-framework-ts-mocha/issues/5")
def test_add_booking_no_firstname(booking_service):
    booking = BookingModel(
        lastname="Snow",
        totalprice=1000,
        depositpaid=True,
        bookingdates={
            "checkin": "2024-01-01",
            "checkout": "2024-02-01"
        },
        additionalneeds="Breakfast"
    )

    response = booking_service.add_booking(booking)
    assert response.status == 400
