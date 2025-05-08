import { BookingService } from "../../models/services/BookingService.js";
import { BookingResponse } from "../../models/responses/BookingResponse.js";
import { BookingModel } from "../../models/request/BookingModel.js";
import "chai/register-should.js";

describe("Patch Booking", () => {
  const bookingService = new BookingService();
  let originalBooking: BookingResponse;

  before(async () => {
    await bookingService.authenticate();
  });

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
    response.data.additionalneeds?.should.equal(originalBooking.booking.additionalneeds);
  });

  it("@Regression - Partially Update Booking successfully - Response time < 1000 ms", async () => {
    const patchedBooking: BookingModel = {
      firstname: "Jim",
    };

    const response = await bookingService.partialUpdateBooking<BookingModel>(
      originalBooking.bookingid,
      patchedBooking,
    );
    response.responseTime.should.be.lessThan(1000);
  });

  it("@Regression - Unauthorized - 403", async () => {
    const unauthorizedBookingService = new BookingService();
    const response = await unauthorizedBookingService.partialUpdateBooking<BookingResponse>(
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

  // BUG: https://github.com/damianpereira86/api-framework-ts-mocha/issues/8
  // eslint-disable-next-line ui-testing/no-disabled-tests
  it.skip("@Regression - Partially Update Non-existent booking - 404", async () => {
    const bookingId = 999999999;
    const response = await bookingService.partialUpdateBooking<BookingResponse>(bookingId, {
      firstname: "John",
      lastname: "Winter",
      totalprice: 500,
      depositpaid: true,
      bookingdates: {
        checkin: "2024-01-01",
        checkout: "2024-02-01",
      },
      additionalneeds: "Lunch",
    });
    response.status.should.equal(404, JSON.stringify(response.data));
  });
});
