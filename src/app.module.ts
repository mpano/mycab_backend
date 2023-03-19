import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ReportModule } from './report/report.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { Report } from './report/report.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BookingModule } from './booking/booking.module';
import { Booking } from './booking/booking.entity';
import { PrivatebookingModule } from './privatebooking/privatebooking.module';
import { Privatebooking } from './privatebooking/privatebooking.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          type: 'postgres',
          host: config.get('DB_HOST'),

          database: config.get<string>('DB_NAME'),
          port: +config.get<number>('DB_PORT'),
          username: config.get('DB_USERNAME'),
          password: config.get('DB_PASSWORD'),
          synchronize: true,
          entities: [User, Report, Booking, Privatebooking],
        };
      },
    }),
    UserModule,
    ReportModule,
    BookingModule,
    PrivatebookingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

