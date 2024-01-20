export enum METHODS {
  GET = 'GET',
  PUT = 'PUT',
  POST = 'POST',
  DELETE = 'DELETE',
}

export type TUrl = string;
export type TOptions = {
  method: METHODS;
  timeout?: number;
  headers?: Record<string, string>;
  data?: any;
  retries?: number;
};
