import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as winston from 'winston';
import {
  utilities as nestWinstonModuleUtilities,
  WinstonModule,
} from 'nest-winston';
import authConfig from './config/authConfig';
// import emailConfig from './config/emailConfig';
// import { validationSchema } from './config/validationSchema';
import { UsersModule } from './users/users.module';
import { ExceptionModule } from './exception/exception.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from './logging/logging.interceptor';
import { LoggingModule } from './logging/logging.module';
import { TerminusModule } from '@nestjs/terminus';
import { HealthCheckController } from './health-check/health-check.controller';
import { HttpModule } from '@nestjs/axios';
import { DogHealthIndicator } from './health-check/dog.health';

@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      // envFilePath: [`${__dirname}/config/env/.${process.env.NODE_ENV}.env`],
      load: [authConfig],
      isGlobal: true,
      // validationSchema,
    }),
    TypeOrmModule.forRoot({
      // type: 'mysql',
      // host: process.env.DATABASE_HOST, // 'localhost',
      // port: 3306,
      // username: process.env.DATABASE_USERNAME, // 'root',
      // password: process.env.DATABASE_PASSWORD, // 'test',
      // database: 'test',
      type: 'mysql',
      host: process.env.MYSQL_TEAMSPOON_MAIN_MASTER_DB_SERVER,
      port: 3306,
      username: process.env.MYSQL_TEAMSPOON_MAIN_MASTER_DB_USER,
      password: process.env.MYSQL_TEAMSPOON_MAIN_MASTER_DB_PASSWORD,
      database: process.env.MYSQL_TEAMSPOON_MAIN_MASTER_DATABASE,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      // synchronize: process.env.DATABASE_SYNCHRONIZE === 'true',
      // migrations: [__dirname + '/**/migrations/*.js'],
      // migrationsTableName: 'migrations',
    }),
    // WinstonModule.forRoot({
    //   transports: [
    //     new winston.transports.Console({
    //       level: process.env.NODE_ENV === 'production' ? 'info' : 'silly',
    //       format: winston.format.combine(
    //         winston.format.timestamp(),
    //         nestWinstonModuleUtilities.format.nestLike('MyApp', { prettyPrint: true }),
    //       ),
    //     }),
    //   ],
    // }),
    ExceptionModule,
    LoggingModule,
    TerminusModule,
    HttpModule,
  ],
  controllers: [HealthCheckController],
  providers: [DogHealthIndicator],
})
export class AppModule {}
