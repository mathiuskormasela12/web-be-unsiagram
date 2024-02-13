import { HttpStatus, Injectable } from '@nestjs/common';
import { RegisterAccountDto } from './dto/registerAccount.dto';
import { IResponse } from 'src/response/interfaces/IResponse';

@Injectable()
export class AuthService {
  constructor() {}

  public registerAccount(
    data: RegisterAccountDto,
  ): IResponse<RegisterAccountDto> {
    if (data.email !== 'jhondoe@gmail.com') {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        data,
      };
    } else {
      return {
        statusCode: HttpStatus.CREATED,
        data,
      };
    }
  }
}
