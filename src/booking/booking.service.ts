import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Booking } from './booking.entity';
import { CreateBookingDto } from "./dtos/create-booking.dto";
import { User } from "../user/user.entity";

@Injectable()
export class BookingService {
  constructor(@InjectRepository(Booking) private repo: Repository<Booking>) {}
  create(bookingdto: CreateBookingDto, user: User) {
    const booking = this.repo.create(bookingdto);
    booking.user = user;
    return this.repo.save(booking);
  }
  findall() {
    return this.repo.find();
  }
  async findbyid(id: number): Promise<Booking> {
    const boo = await this.repo.findOne({ where: { id } });
    if(!boo){
      throw new NotFoundException('booking not found');
    }
    if(!id){
      return null;
    }
    return boo;
  }
  async update(id: number, atr: Partial<Booking>){
    const booking = await this.findbyid(id);
    if(!booking){
      throw new BadRequestException('no user with that id to edit');
    }
    Object.assign(booking, atr);
    return this.repo.save(booking);
  }
}
