import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { ResponseModule } from './response/response.module';
import { PrismaModule } from './prisma/prisma.module';

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

    // Define all modules here
    PrismaModule,
    ResponseModule,
    AuthModule,
  ],
})
export class AppModule {}
