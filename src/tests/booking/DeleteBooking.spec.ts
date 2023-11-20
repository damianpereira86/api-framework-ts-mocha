import { BookingService } from "../../models/services/BookingService.js";
import { BookingResponse } from "../../models/responses/BookingResponse.js";
import chai from "chai";

chai.should();

describe("Delete Booking", () => {
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

  it("@Smoke - Delete Booking successfully", async () => {
    const response = await bookingService.deleteBooking<BookingResponse>(
      bookingId,
    );
    response.status.should.equal(201, JSON.stringify(response.data));

    const getResponse = await bookingService.getBooking<BookingResponse>(
      bookingId,
    );
    getResponse.status.should.equal(404, JSON.stringify(getResponse.data));
  });

  it("@Regression - Delete Booking successfully - Status code 204", async () => {
    const response = await bookingService.deleteBooking<BookingResponse>(
      bookingId,
    );
    response.status.should.equal(204, JSON.stringify(response.data));
  });

  it("@Regression - Unauthorized - 403", async () => {
    const response = await bookingService.deleteBooking<BookingResponse>(
      bookingId,
      {},
    );
    response.status.should.equal(403, JSON.stringify(response.data));
  });

  it("@Regression - Delete Non-existent booking - 404", async () => {
    const bookingId = 999999999;
    const response = await bookingService.deleteBooking<BookingResponse>(
      bookingId,
    );
    response.status.should.equal(404, JSON.stringify(response.data));
  });
});
