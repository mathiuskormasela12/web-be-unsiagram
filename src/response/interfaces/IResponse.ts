import { HttpStatus } from '@nestjs/common';

export interface IResponse<T> {
  statusCode: HttpStatus;
  errors?: Record<string, string[]>;
  message?: string;
  data?: T;
}
