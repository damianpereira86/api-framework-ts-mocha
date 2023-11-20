import { BookingResponse } from "../../models/responses/BookingResponse";
import type { BookingIdResponse } from "../../models/responses/BookingIdResponse";
import { BookingService } from "../../models/services/BookingService.js";
import chai from "chai";

chai.should();

describe("Get Booking Ids", () => {
  const bookingService = new BookingService();

  it("Get All Booking Ids", async () => {
    const response = await bookingService.getBookingIds<BookingIdResponse[]>();

    response.status.should.equal(200, JSON.stringify(response.data));
    response.data.length.should.be.greaterThan(1);
  });

  it("Get Booking Ids with query parameters - firstname", async () => {
    const randomFirstName = "Damian" + Math.random().toString(36).substring(7);
    const booking = await bookingService.addBooking<BookingResponse>({
      firstname: randomFirstName,
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

    const params = new URLSearchParams();
    params.append("firstname", randomFirstName);

    const response = await bookingService.getBookingIds<BookingIdResponse[]>(
      params,
    );

    response.status.should.equal(200, JSON.stringify(response.data));
    response.data.length.should.equal(1);
    response.data[0]?.bookingid.should.equal(bookingId);
  });
});
