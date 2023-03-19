import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CreateBookingDto } from './dtos/create-booking.dto';
import { BookingService } from './booking.service';
import { AuthGuards } from '../user/guards/auth.guards';
import { currentuser } from '../user/functions/current-user.decorator';
import { User } from '../user/user.entity';
import { Serialize } from '../interceptor/serialize.enterceptor';
import { BookingDto } from './dtos/booking.dto';

@Controller('booking')
export class BookingController {

  constructor(private bookingser: BookingService) {}
  @UseGuards(AuthGuards)
  @Serialize(BookingDto)
  @Post('/add')
  async create(@Body() body: CreateBookingDto,@currentuser() user: User){
    const booking = await this.bookingser.create(body, user);
    return booking;
  }
  @UseGuards(AuthGuards)
  @Get('/viewall')
  display() {
    return this.bookingser.findall();
  }
  // @Post('/update')
  // async update(@Param('id') id: string,@Body)

}
