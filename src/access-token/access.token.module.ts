import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AccessTokenService } from './access.token.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get('SERVICE_ACCESS_TOKEN_SECRET_KEY'),
        signOptions: {
          expiresIn: config.get('SERVICE_ACCESS_TOKEN_EXPIRES_IN'),
        },
      }),
    }),
  ],
  providers: [AccessTokenService],
  exports: [AccessTokenService],
})
export class AccessTokenModule {}
