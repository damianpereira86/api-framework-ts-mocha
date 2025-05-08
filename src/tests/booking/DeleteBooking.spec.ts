import { BookingService } from "../../models/services/BookingService.js";
import { BookingResponse } from "../../models/responses/BookingResponse.js";
import "chai/register-should.js";

describe("Delete Booking", () => {
  const bookingService = new BookingService();
  let bookingId: number;

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
    bookingId = response.data.bookingid;
  });

  it("@Smoke - Delete Booking successfully", async () => {
    const response = await bookingService.deleteBooking<BookingResponse>(bookingId);
    response.status.should.equal(201, JSON.stringify(response.data));

    const getResponse = await bookingService.getBooking<BookingResponse>(bookingId);
    getResponse.status.should.equal(404, JSON.stringify(getResponse.data));
  });

  it("@Regression - Delete Booking successfully - Response time < 1000 ms", async () => {
    const response = await bookingService.deleteBooking<BookingResponse>(bookingId);
    response.responseTime.should.be.lessThan(1000);
  });

  // BUG: https://github.com/damianpereira86/api-framework-ts-mocha/issues/6
  // eslint-disable-next-line ui-testing/no-disabled-tests
  it.skip("@Regression - Delete Booking successfully - Status code 204", async () => {
    const response = await bookingService.deleteBooking<BookingResponse>(bookingId);
    response.status.should.equal(204, JSON.stringify(response.data));
  });

  it("@Regression - Unauthorized - 403", async () => {
    const unauthorizedBookingService = new BookingService();
    const response = await unauthorizedBookingService.deleteBooking<BookingResponse>(bookingId);
    response.status.should.equal(403, JSON.stringify(response.data));
  });

  // BUG: https://github.com/damianpereira86/api-framework-ts-mocha/issues/7
  // eslint-disable-next-line ui-testing/no-disabled-tests
  it.skip("@Regression - Delete Non-existent booking - 404", async () => {
    const bookingId = 999999999;
    const response = await bookingService.deleteBooking<BookingResponse>(bookingId);
    response.status.should.equal(404, JSON.stringify(response.data));
  });
});
