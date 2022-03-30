export interface IResponse<T = void> {
  success: boolean;
  message: string;
  data?: T;
}
