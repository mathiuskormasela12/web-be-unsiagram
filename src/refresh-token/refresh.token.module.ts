import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { RefreshTokenService } from './refresh.token.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get('SERVICE_REFRESH_TOKEN_SECRET_KEY'),
        signOptions: {
          expiresIn: config.get('SERVICE_REFRESH_TOKEN_EXPIRES_IN'),
        },
      }),
    }),
  ],
  providers: [RefreshTokenService],
  exports: [RefreshTokenService],
})
export class RefreshTokenModule {}
