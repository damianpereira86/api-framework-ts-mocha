import { BookingService } from "../../models/services/BookingService.js";
import { BookingResponse } from "../../models/responses/BookingResponse.js";
import { BookingModel } from "../../models/request/BookingModel.js";
import chai from "chai";

chai.should();

describe("Patch Booking", () => {
  const bookingService = new BookingService();
  let originalBooking: BookingResponse;

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
    originalBooking = response.data;

    await bookingService.Authenticate();
  });

  it("@Smoke - Partially Update Booking successfully - 200", async () => {
    const patchedBooking: BookingModel = {
      firstname: "Jim",
    };

    const response = await bookingService.partialUpdateBooking<BookingModel>(
      originalBooking.bookingid,
      patchedBooking,
    );

    response.status.should.equal(200, JSON.stringify(response.data));
    response.data.firstname?.should.equal(patchedBooking.firstname);
    response.data.lastname?.should.equal(originalBooking.booking.lastname);
    response.data.totalprice?.should.equal(originalBooking.booking.totalprice);
    response.data.depositpaid?.should.be.true;
    response.data.bookingdates?.checkin?.should.equal(
      originalBooking.booking.bookingdates?.checkin,
    );
    response.data.bookingdates?.checkout?.should.equal(
      originalBooking.booking.bookingdates?.checkout,
    );
    response.data.additionalneeds?.should.equal(
      originalBooking.booking.additionalneeds,
    );
  });

  it("@Regression - Unauthorized - 403", async () => {
    const response = await bookingService.partialUpdateBooking<BookingResponse>(
      originalBooking,
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

  it("@Regression - Partially Update Non-existent booking - 404", async () => {
    const bookingId = 999999999;
    const response = await bookingService.partialUpdateBooking<BookingResponse>(
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
