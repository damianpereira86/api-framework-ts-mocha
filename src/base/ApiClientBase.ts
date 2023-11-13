import axios, { AxiosResponse, AxiosStatic } from "axios";
import "dotenv/config";

export abstract class ApiClientBase {
  protected constructor() {
    axios.interceptors.response.use(async (response) => {
      const customResponse: AxiosResponse = {
        data: response.data,
        status: response.status,
        headers: response.headers,
        statusText: response.statusText,
        config: response.config,
      };
      return customResponse;
    });

    axios.defaults.headers.common = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    axios.defaults.validateStatus = () => true;
  }

  client: AxiosStatic = axios;
}
