export interface Response<T> {
  data: T;
  status: number;
  headers: unknown;
  responseTime: number;
}
