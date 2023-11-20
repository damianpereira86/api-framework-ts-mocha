import { BookingService } from "../../models/services/BookingService.js";
import { BookingResponse } from "../../models/responses/BookingResponse";
import { BookingModel } from "../../models/request/BookingModel";
import chai from "chai";

chai.should();

describe("Update Booking", () => {
  const bookingService = new BookingService();
  let bookingId: number;

  beforeEach(async () => {
    const response = await bookingService.addBooking<BookingResponse>({
      firstname: "John",
      lastname: "Snow",
      totalprice: 1000,
      depositpaid: true,
      bookingdates: {
        checkin: "2024-01-01",
        checkout: "2024-02-01",
      },
      additionalneeds: "Breakfast",
    });
    bookingId = response.data.bookingid;

    await bookingService.Authenticate();
  });

  it("@Smoke - Update Booking successfully - 200", async () => {
    const booking: BookingModel = {
      firstname: "Jim",
      lastname: "Brown",
      totalprice: 111,
      depositpaid: false,
      bookingdates: {
        checkin: "2020-01-01",
        checkout: "2021-01-01",
      },
      additionalneeds: "Lunch",
    };

    const response = await bookingService.updateBooking<BookingModel>(
      bookingId,
      booking,
    );

    response.status.should.equal(200, JSON.stringify(response.data));
    response.data.firstname?.should.equal(booking.firstname);
    response.data.lastname?.should.equal(booking.lastname);
    response.data.totalprice?.should.equal(booking.totalprice);
    response.data.depositpaid?.should.be.false;
    response.data.bookingdates?.checkin?.should.equal(
      booking.bookingdates?.checkin,
    );
    response.data.bookingdates?.checkout?.should.equal(
      booking.bookingdates?.checkout,
    );
    response.data.additionalneeds?.should.equal(booking.additionalneeds);
  });

  it("@Regression - Unauthorized - 403", async () => {
    const response = await bookingService.updateBooking<BookingResponse>(
      bookingId,
      {
        firstname: "John",
        lastname: "Winter",
        totalprice: 500,
        depositpaid: true,
        bookingdates: {
          checkin: "2024-01-01",
          checkout: "2024-02-01",
        },
        additionalneeds: "Lunch",
      },
      {},
    );
    response.status.should.equal(403, JSON.stringify(response.data));
  });

  it("@Regression - Update Non-existent booking - 404", async () => {
    const bookingId = 999999999;
    const response = await bookingService.updateBooking<BookingResponse>(
      bookingId,
      {
        firstname: "John",
        lastname: "Winter",
        totalprice: 500,
        depositpaid: true,
        bookingdates: {
          checkin: "2024-01-01",
          checkout: "2024-02-01",
        },
        additionalneeds: "Lunch",
      },
    );
    response.status.should.equal(404, JSON.stringify(response.data));
  });
});
