export interface FetchOptions {
  url: string;
  method: string;
  params?: Record<string, any>;
  data?: Record<string, any>;
}
