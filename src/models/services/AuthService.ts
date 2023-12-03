import { ServiceBase } from "../../base/ServiceBase.js";
import { CredentialsModel } from "../request/CredentialsModel";
import { Response } from "../responses/Response";

export class AuthService extends ServiceBase {
  constructor() {
    super("/auth");
  }

  async signIn<T>(credentials: CredentialsModel): Promise<Response<T>> {
    return await this.post(this.url, credentials);
  }
}
