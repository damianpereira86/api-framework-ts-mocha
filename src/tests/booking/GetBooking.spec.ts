import { BookingModel } from "../../models/request/BookingModel.js";
import { BookingResponse } from "../../models/responses/BookingResponse.js";
import { BookingService } from "../../models/services/BookingService.js";
import { Response } from "../../models/responses/Response.js";
import "chai/register-should.js";

describe("Get Booking", () => {
  const bookingService = new BookingService();
  let bookingId: number;
  let createdBooking: Response<BookingResponse>;

  before(async () => {
    createdBooking = await bookingService.addBooking<BookingResponse>({
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

    bookingId = createdBooking.data.bookingid;
  });

  it("@Smoke - Get Booking successfully - 200", async () => {
    const response = await bookingService.getBooking<BookingModel>(bookingId);
    response.status.should.equal(200, JSON.stringify(response.data));
    response.data.firstname?.should.equal(createdBooking.data.booking.firstname);
    response.data.lastname?.should.equal(createdBooking.data.booking.lastname);
    response.data.totalprice?.should.equal(createdBooking.data.booking.totalprice);
    response.data.depositpaid?.should.be.true;
    response.data.bookingdates?.checkin?.should.equal(
      createdBooking.data.booking.bookingdates?.checkin,
    );
    response.data.bookingdates?.checkout?.should.equal(
      createdBooking.data.booking.bookingdates?.checkout,
    );
    response.data.additionalneeds?.should.equal(createdBooking.data.booking.additionalneeds);
  });

  it("@Regression - Get Booking successfully - Response time < 1000 ms", async () => {
    const response = await bookingService.getBooking<BookingModel>(bookingId);
    response.responseTime.should.be.lessThan(1000);
  });

  it("@Regression - Get Non-existent Booking - 404", async () => {
    const bookingId = 999999999;
    const response = await bookingService.getBooking<BookingResponse>(bookingId);
    response.status.should.equal(404, JSON.stringify(response.data));
  });
});
