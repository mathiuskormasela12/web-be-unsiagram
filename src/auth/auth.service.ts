import { HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { RegisterAccountDto } from './dto/registerAccount.dto';
import { IResponse } from '../response/interfaces/IResponse';
import { PrismaService } from '../prisma/prisma.service';
import { LoginAccountDto } from './dto/loginAccount.dto';
import { ILoginAccountResponse } from './interfaces/ILoginAccountResponse';
import { AccessTokenService } from '../access-token/access.token.service';
import { RefreshTokenService } from '../refresh-token/refresh.token.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly accessTokenService: AccessTokenService,
    private readonly refreshTokenService: RefreshTokenService,
  ) {}

  public async loginAccount(
    data: LoginAccountDto,
  ): Promise<IResponse<ILoginAccountResponse>> {
    try {
      const user = await this.prismaService.user.findMany({
        where: {
          email: data.email,
        },
      });

      if (
        user?.length > 0 &&
        (await bcrypt.compare(data.password, user[0]?.password))
      ) {
        const [accessToken, refreshToken]: [string, string] = await Promise.all(
          [
            this.accessTokenService.createToken(user[0].id),
            this.refreshTokenService.createToken(user[0].id),
          ],
        );

        return {
          statusCode: HttpStatus.OK,
          data: {
            accessToken,
            refreshToken,
          },
        };
      } else {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Email or password is wrong',
        };
      }
    } catch (err) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        errors: {
          error: err.message,
        },
      };
    }
  }

  public async registerAccount(
    data: RegisterAccountDto,
  ): Promise<IResponse<RegisterAccountDto>> {
    if (data.password !== data.repeatPassword) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        errors: {
          password: ['Password do not match'],
        },
      };
    }

    try {
      const user = await this.prismaService.user.findMany({
        where: {
          email: data.email,
        },
      });

      if (user?.length === 0) {
        delete data.repeatPassword;
        data.password = await bcrypt.hash(data.password, 8);

        await this.prismaService.user.create({
          data: {
            ...data,
          },
        });

        return {
          statusCode: HttpStatus.CREATED,
          message: 'Register successfully',
        };
      } else {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          errors: {
            account: ['Account already exists'],
          },
        };
      }
    } catch (err) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        errors: {
          error: err.message,
        },
      };
    }
  }
}
