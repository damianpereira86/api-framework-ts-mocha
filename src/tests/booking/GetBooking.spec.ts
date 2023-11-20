import { BookingModel } from "../../models/request/BookingModel.js";
import { BookingResponse } from "../../models/responses/BookingResponse.js";
import { BookingService } from "../../models/services/BookingService.js";
import chai from "chai";

chai.should();

describe("Get Booking", () => {
  const bookingService = new BookingService();

  it("@Smoke - Get Booking successfully - 200", async () => {
    const booking = await bookingService.addBooking<BookingResponse>({
      firstname: "Damian",
      lastname: "Pereira",
      totalprice: 1000,
      depositpaid: true,
      bookingdates: {
        checkin: "2024-01-01",
        checkout: "2024-02-01",
      },
      additionalneeds: "Breakfast",
    });

    const bookingId = booking.data.bookingid;

    const response = await bookingService.getBooking<BookingModel>(bookingId);
    response.status.should.equal(200, JSON.stringify(response.data));
    response.data.firstname?.should.equal(booking.data.booking.firstname);
    response.data.lastname?.should.equal(booking.data.booking.lastname);
    response.data.totalprice?.should.equal(booking.data.booking.totalprice);
    response.data.depositpaid?.should.be.true;
    response.data.bookingdates?.checkin?.should.equal(
      booking.data.booking.bookingdates?.checkin,
    );
    response.data.bookingdates?.checkout?.should.equal(
      booking.data.booking.bookingdates?.checkout,
    );
    response.data.additionalneeds?.should.equal(
      booking.data.booking.additionalneeds,
    );
  });

  it("@Regression - Get Non-existent Booking - 404", async () => {
    const bookingId = 999999999;
    const response = await bookingService.getBooking<BookingResponse>(
      bookingId,
    );
    response.status.should.equal(404, JSON.stringify(response.data));
  });
});
