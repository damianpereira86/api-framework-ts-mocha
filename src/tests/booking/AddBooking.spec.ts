import { BookingService } from "../../models/services/BookingService.js";
import { BookingResponse } from "../../models/responses/BookingResponse";
import * as chai from "chai";
import { BookingModel } from "../../models/request/BookingModel";

chai.should();

describe("Add Booking", () => {
  const bookingService = new BookingService();

  it("@Smoke - Add Booking Successfully", async () => {
    const booking: BookingModel = {
      firstname: "Jim",
      lastname: "Brown",
      totalprice: 111,
      depositpaid: true,
      bookingdates: {
        checkin: "2020-01-01",
        checkout: "2021-01-01",
      },
      additionalneeds: "Breakfast",
    };

    const response = await bookingService.addBooking<BookingResponse>(booking);

    response.status.should.equal(200, JSON.stringify(response.data));
    response.data.bookingid.should.be.a("number");
    response.data.booking.firstname?.should.equal(booking.firstname);
    response.data.booking.lastname?.should.equal(booking.lastname);
    response.data.booking.totalprice?.should.equal(booking.totalprice);
    response.data.booking.depositpaid?.should.be.true;
    response.data.booking.bookingdates?.checkin?.should.equal(booking.bookingdates?.checkin);
    response.data.booking.bookingdates?.checkout?.should.equal(booking.bookingdates?.checkout);
    response.data.booking.additionalneeds?.should.equal(booking.additionalneeds);
  });

  it("@Regression - Add Booking Successfully - Response time < 1000 ms", async () => {
    const booking: BookingModel = {
      firstname: "Jim",
      lastname: "Brown",
      totalprice: 111,
      depositpaid: true,
      bookingdates: {
        checkin: "2020-01-01",
        checkout: "2021-01-01",
      },
      additionalneeds: "Breakfast",
    };

    const response = await bookingService.addBooking<BookingResponse>(booking);
    response.responseTime.should.be.lessThan(1000);
  });

  // BUG: https://github.com/damianpereira86/api-framework-ts-mocha/issues/4
  // eslint-disable-next-line ui-testing/no-disabled-tests
  it.skip("@Regression - Add Booking Successfully - Status code 201", async () => {
    const booking: BookingModel = {
      firstname: "Jim",
      lastname: "Brown",
      totalprice: 111,
      depositpaid: true,
      bookingdates: {
        checkin: "2020-01-01",
        checkout: "2021-01-01",
      },
      additionalneeds: "Breakfast",
    };

    const response = await bookingService.addBooking<BookingResponse>(booking);

    response.status.should.equal(201);
  });

  // BUG: https://github.com/damianpereira86/api-framework-ts-mocha/issues/5
  // eslint-disable-next-line ui-testing/no-disabled-tests
  it.skip("@Regression - No Firstname - 400", async () => {
    const response = await bookingService.addBooking<BookingResponse>({
      lastname: "Snow",
      totalprice: 1000,
      depositpaid: true,
      bookingdates: {
        checkin: "2024-01-01",
        checkout: "2024-02-01",
      },
      additionalneeds: "Breakfast",
    });
    response.status.should.equal(400);
  });
});
