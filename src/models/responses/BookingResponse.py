class BookingResponse:
    def __init__(self, bookingid: int, booking: 'BookingModel'):
        self.bookingid = bookingid
        self.booking = booking
