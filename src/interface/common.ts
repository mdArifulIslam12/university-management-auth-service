import { IGenricErrorMessage } from './error';

export type IGenricErrorResponse = {
  statusCode: number;
  message: string;
  errorMessage: IGenricErrorMessage[];
};

export type IGenricResponse<T> = {
  meta: {
    page: number;
    limit: number;
    total: number;
  };
  data: T;
};
