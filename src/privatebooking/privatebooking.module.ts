import { Module } from '@nestjs/common';
import { PrivatebookingController } from './privatebooking.controller';
import { PrivatebookingService } from './privatebooking.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Privatebooking } from './privatebooking.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Privatebooking])],
  controllers: [PrivatebookingController],
  providers: [PrivatebookingService]
})
export class PrivatebookingModule {}
