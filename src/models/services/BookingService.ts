import { ServiceBase } from "../../base/ServiceBase.js";
import { BookingModel } from "../request/BookingModel";
import { Response } from "../responses/Response";

export class BookingService extends ServiceBase {
  constructor() {
    super("/booking");
  }

  async getBookingIds<T>(
    params: URLSearchParams = new URLSearchParams(),
    config = this.defaultConfig,
  ): Promise<Response<T>> {
    config.params = params;
    return await this.api.client.get(this.url, config);
  }

  async getBooking<T>(
    id: unknown,
    config = this.defaultConfig,
  ): Promise<Response<T>> {
    return await this.api.client.get(`${this.url}/${id}`, config);
  }

  async addBooking<T>(
    booking: BookingModel,
    config = this.defaultConfig,
  ): Promise<Response<T>> {
    return await this.api.client.post(this.url, booking, config);
  }

  async updateBooking<T>(
    id: unknown,
    booking: BookingModel,
    config = this.defaultConfig,
  ): Promise<Response<T>> {
    return await this.api.client.put(`${this.url}/${id}`, booking, config);
  }

  async partialUpdateBooking<T>(
    id: unknown,
    booking: BookingModel,
    config = this.defaultConfig,
  ): Promise<Response<T>> {
    return await this.api.client.patch(`${this.url}/${id}`, booking, config);
  }

  async deleteBooking<T>(
    id: unknown,
    config = this.defaultConfig,
  ): Promise<Response<T>> {
    return await this.api.client.delete(`${this.url}/${id}`, config);
  }
}
