import { AxiosResponse, type AxiosRequestConfig } from "axios";
import { ApiClient } from "./ApiClient.js";
import { type SessionResponse } from "../models/responses/SessionResponse";
import { AuthService } from "../models/services/AuthService.js";
import { Response } from "../models/responses/Response";

export class ServiceBase {
  private api: ApiClient;
  protected url: string;
  protected defaultConfig: AxiosRequestConfig;

  constructor(endpointPath: string) {
    this.api = ApiClient.getInstance();
    this.url = this.baseUrl + endpointPath;
    this.defaultConfig = {};
  }

  get baseUrl(): string {
    return process.env["BASEURL"] ?? "";
  }

  async authenticate(): Promise<void> {
    const authService = new AuthService();
    const response = await authService.signIn<SessionResponse>({
      username: process.env["USER"],
      password: process.env["PASSWORD"],
    });
    this.defaultConfig = {
      headers: { Cookie: "token=" + response.data.token },
    };
  }

  protected async get<T>(
    url: string,
    config: AxiosRequestConfig = this.defaultConfig,
  ): Promise<Response<T>> {
    const startTime = Date.now();
    const response = await this.api.client.get<T>(url, config);
    const endTime = Date.now();

    const customResponse: Response<T> = this.buildResponse<T>(endTime, startTime, response);
    return customResponse;
  }

  protected async post<T>(
    url: string,
    data: unknown,
    config: AxiosRequestConfig = this.defaultConfig,
  ): Promise<Response<T>> {
    const startTime = Date.now();
    const response = await this.api.client.post<T>(url, data, config);
    const endTime = Date.now();

    const customResponse: Response<T> = this.buildResponse<T>(endTime, startTime, response);
    return customResponse;
  }

  protected async put<T>(
    url: string,
    data: unknown,
    config: AxiosRequestConfig = this.defaultConfig,
  ): Promise<Response<T>> {
    const startTime = Date.now();
    const response = await this.api.client.put<T>(url, data, config);
    const endTime = Date.now();

    const customResponse: Response<T> = this.buildResponse<T>(endTime, startTime, response);
    return customResponse;
  }

  protected async patch<T>(
    url: string,
    data: unknown,
    config: AxiosRequestConfig = this.defaultConfig,
  ): Promise<Response<T>> {
    const startTime = Date.now();
    const response = await this.api.client.patch<T>(url, data, config);
    const endTime = Date.now();

    const customResponse: Response<T> = this.buildResponse<T>(endTime, startTime, response);
    return customResponse;
  }

  protected async delete<T>(
    url: string,
    config: AxiosRequestConfig = this.defaultConfig,
  ): Promise<Response<T>> {
    const startTime = Date.now();
    const response = await this.api.client.delete<T>(url, config);
    const endTime = Date.now();

    const customResponse: Response<T> = this.buildResponse<T>(endTime, startTime, response);
    return customResponse;
  }

  protected async head<T>(
    url: string,
    config: AxiosRequestConfig = this.defaultConfig,
  ): Promise<Response<T>> {
    const startTime = Date.now();
    const response = await this.api.client.head<T>(url, config);
    const endTime = Date.now();

    const customResponse: Response<T> = this.buildResponse<T>(endTime, startTime, response);
    return customResponse;
  }

  protected async options<T>(
    url: string,
    config: AxiosRequestConfig = this.defaultConfig,
  ): Promise<Response<T>> {
    const startTime = Date.now();
    const response = await this.api.client.options<T>(url, config);
    const endTime = Date.now();

    const customResponse: Response<T> = this.buildResponse<T>(endTime, startTime, response);
    return customResponse;
  }

  private buildResponse<T>(endTime: number, startTime: number, response: AxiosResponse<T>) {
    const responseTime = endTime - startTime;

    const customResponse: Response<T> = {
      data: response.data,
      status: response.status,
      headers: response.headers,
      responseTime: responseTime,
    };
    return customResponse;
  }
}
