import { ApiClient } from "../../base/ApiClient.js";
import type { BookingModel } from "../request/BookingModel.js";
import type { Response } from "../responses/Response";

export class BookingService {
  private api: ApiClient;
  private url: string;

  constructor() {
    this.api = ApiClient.getInstance();
    this.url = this.api.baseUrl + "/booking";
  }

  async getBookingIds<T>(
    params: URLSearchParams = new URLSearchParams(),
  ): Promise<Response<T>> {
    return await this.api.client.get(this.url, { params });
  }

  async getBooking<T>(id: unknown): Promise<Response<T>> {
    return await this.api.client.get(`${this.url}/${id}`);
  }

  async addBooking<T>(booking: BookingModel): Promise<Response<T>> {
    return await this.api.client.post(this.url, booking);
  }
}
