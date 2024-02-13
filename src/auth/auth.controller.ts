import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { RegisterAccountDto } from './dto/registerAccount.dto';
import { ResponseService } from 'src/response/response.service';

@ApiTags('Auth')
@Controller('v1/auth')
export class AuthController {
  constructor(
    private responseService: ResponseService,
    private authService: AuthService,
  ) {}

  @Post('register')
  public registerAccount(@Body() data: RegisterAccountDto) {
    const result = this.authService.registerAccount(data);
    throw this.responseService.send(result);
  }
}
