import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { APP_PIPE } from '@nestjs/core';
import { ValidationPipe } from '../pipes/validation.pipe';
import { AccessTokenModule } from 'src/access-token/access.token.module';
import { RefreshTokenModule } from 'src/refresh-token/refresh.token.module';

@Module({
  imports: [AccessTokenModule, RefreshTokenModule],
  controllers: [AuthController],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    AuthService,
  ],
})
export class AuthModule {}
