import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdsModule } from './advertisement/ads.module';
import { RewardModule } from './reward/reward.module';
import { ExceptionFilterModule } from './common/exception-filters/exception-filter.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [
        //  authConfig
      ],
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_DB_SERVER,
      port: +process.env.MYSQL_DB_PORT,
      username: process.env.MYSQL_DB_USER,
      password: process.env.MYSQL_DB_PASSWORD,
      database: process.env.MYSQL_DB_DATABASE,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
    }),
    ExceptionFilterModule,
    AdsModule,
    RewardModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
