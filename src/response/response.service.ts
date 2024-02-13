import { HttpException, Injectable } from '@nestjs/common';
import { IResponse } from './interfaces/IResponse';

@Injectable()
export class ResponseService {
  public send<T>(response: IResponse<T>) {
    return new HttpException(response, response.statusCode);
  }
}
