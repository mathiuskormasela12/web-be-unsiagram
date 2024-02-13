import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { IResponse } from '../response/interfaces/IResponse';
import { RegisterAccountDto } from './dto/registerAccount.dto';
import { HttpStatus } from '@nestjs/common';

describe('AuthController', () => {
  let authService: AuthService;

  beforeEach(async () => {
    const auth: TestingModule = await Test.createTestingModule({
      providers: [AuthService],
    }).compile();

    authService = auth.get<AuthService>(AuthService);
  });

  describe('Register Account', () => {
    it('should return req.body', () => {
      const dto: RegisterAccountDto = {
        firstName: 'Jhon',
        lastName: 'Doe',
        email: 'jhondoe@gmail.com',
        password: 'Potato1234!',
        repeatPassword: 'Potato1234!',
      };

      const data: IResponse<RegisterAccountDto> = {
        statusCode: HttpStatus.CREATED,
        data: dto,
      };
      expect(authService.registerAccount(dto)).toEqual(data);
    });

    it('should return req.body with BAD_REQUEST', () => {
      const dto: RegisterAccountDto = {
        firstName: 'Jhon',
        lastName: 'Doe',
        email: 'jhondoe123@gmail.com',
        password: 'Potato1234!',
        repeatPassword: 'Potato1234!',
      };

      const data: IResponse<RegisterAccountDto> = {
        statusCode: HttpStatus.BAD_REQUEST,
        data: dto,
      };
      expect(authService.registerAccount(dto)).toEqual(data);
    });
  });
});
