export interface FetchOptions {
  url: string;
  method: string;
  params?: Record<string, any>;
  data?: Record<string, any>;
}

export interface ResponseBody<T> {
  code: number;
  data: T;
  message: string;
  meta: object;
}
