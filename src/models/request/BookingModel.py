class BookingModel:
    def __init__(self, id=None, firstname=None, lastname=None, totalprice=None, depositpaid=None, bookingdates=None, additionalneeds=None):
        self.id = id
        self.firstname = firstname
        self.lastname = lastname
        self.totalprice = totalprice
        self.depositpaid = depositpaid
        self.bookingdates = bookingdates
        self.additionalneeds = additionalneeds
