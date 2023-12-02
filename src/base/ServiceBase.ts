import { type AxiosRequestConfig } from "axios";
import { ApiClient } from "./ApiClient.js";
import { type SessionResponse } from "../models/responses/SessionResponse";
import { AuthService } from "../models/services/AuthService.js";

export class ServiceBase {
  protected api: ApiClient;
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

  async Authenticate(): Promise<void> {
    const authService = new AuthService();
    const response = await authService.signIn<SessionResponse>({
      username: process.env["USER"],
      password: process.env["PASSWORD"],
    });
    this.defaultConfig = {
      headers: { Cookie: "token=" + response.data.token },
    };
  }
}
