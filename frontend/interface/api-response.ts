export interface Response<T> {
  result: T;
}

export interface ErrorResponse<T = string> {
  error: T;
  message: string;
}
