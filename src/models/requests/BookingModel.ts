export interface BookingModel {
  id?: number | undefined;
  firstname?: string | undefined;
  lastname?: string | undefined;
  totalprice?: number | undefined;
  depositpaid?: boolean | undefined;
  bookingdates?: {
    checkin?: string | undefined;
    checkout?: string | undefined;
  };
  additionalneeds?: string | undefined;
}
