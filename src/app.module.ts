import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { ResponseModule } from './response/response.module';
import { PrismaModule } from './prisma/prisma.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { AccessTokenModule } from './access-token/access.token.module';
import { RefreshTokenModule } from './refresh-token/refresh.token.module';

@Module({
  imports: [
    // Setup Config to read env file
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // Setup Static Files
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      renderPath: '/static',
      serveRoot: '/static',
    }),

    // Setup Rate Limiter
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => [
        {
          ttl: Number(config.get<number>('SERVICE_RATE_LIMITER_TTL')),
          limit: Number(config.get<number>('SERVICE_RATE_LIMITER_LIMIT')),
        },
      ],
    }),

    // Define all modules here
    PrismaModule,
    ResponseModule,
    AccessTokenModule,
    RefreshTokenModule,
    AuthModule,
  ],
})
export class AppModule {}
