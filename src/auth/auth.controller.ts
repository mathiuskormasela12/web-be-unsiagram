import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { RegisterAccountDto } from './dto/registerAccount.dto';
import { ResponseService } from 'src/response/response.service';
import { LoginAccountDto } from './dto/loginAccount.dto';

@ApiTags('Auth')
@Controller('v1/auth')
export class AuthController {
  constructor(
    private responseService: ResponseService,
    private authService: AuthService,
  ) {}

  @Post('register')
  public async registerAccount(@Body() data: RegisterAccountDto) {
    const result = await this.authService.registerAccount(data);
    throw this.responseService.send(result);
  }

  @Post('/login')
  public async loginAccount(@Body() data: LoginAccountDto) {
    const result = await this.authService.loginAccount(data);
    throw this.responseService.send(result);
  }
}
