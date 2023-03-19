import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { PrivatebookingService } from './privatebooking.service';
import { PrivatebookingDto } from './dtos/privatebooking.dto';
import { AuthGuards } from '../user/guards/auth.guards';
@UseGuards(AuthGuards)
@Controller('privatebooking')
export class PrivatebookingController {
  constructor(private privatesarvice: PrivatebookingService) {}
  @Post('/booking')
  async create(@Body() body: PrivatebookingDto){
    const prive = await this.privatesarvice.create(body);
    return prive;
  }
  @Get('/viewall')
  async displayall(){
    return this.privatesarvice.findall();
  }

}
