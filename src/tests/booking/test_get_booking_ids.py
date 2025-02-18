import pytest
from src.models.services.BookingService import BookingService
from src.models.responses.BookingIdResponse import BookingIdResponse
from src.models.responses.BookingResponse import BookingResponse

@pytest.fixture
def booking_service():
    return BookingService()

def test_get_all_booking_ids(booking_service):
    response = booking_service.get_booking_ids()
    assert response.status == 200
    assert len(response.data) > 1

def test_get_all_booking_ids_response_time(booking_service):
    response = booking_service.get_booking_ids()
    assert response.status == 200
    assert response.response_time < 1000

def test_get_booking_ids_with_query_parameters_firstname(booking_service):
    random_firstname = "Damian" + str(hash("Damian"))
    booking = BookingResponse(
        firstname=random_firstname,
        lastname="Pereira",
        totalprice=1000,
        depositpaid=True,
        bookingdates={
            "checkin": "2024-01-01",
            "checkout": "2024-02-01"
        },
        additionalneeds="Breakfast"
    )
    booking_service.add_booking(booking)

    params = {"firstname": random_firstname}
    response = booking_service.get_booking_ids(params)
    assert response.status == 200
    assert len(response.data) == 1
    assert response.data[0]["bookingid"] == booking.bookingid
