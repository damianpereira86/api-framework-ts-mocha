import { BookingModel } from "../request/BookingModel";

export interface BookingResponse {
  bookingid: number;
  booking: BookingModel;
}
