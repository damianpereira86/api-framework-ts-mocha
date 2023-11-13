import type { BookingIdResponse } from "../../models/responses/BookingIdResponse";
import { BookingService } from "../../models/services/BookingService.js";
import chai from "chai";

chai.should();

describe("Bookings - Get Booking Ids", () => {
  const bookingService = new BookingService();

  it("Get All Booking Ids", async () => {
    const response = await bookingService.getBookingIds<BookingIdResponse[]>();

    response.status.should.equal(200, JSON.stringify(response.data));
    response.data.length.should.be.greaterThan(1);
  });
});
