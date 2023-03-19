import { isMobilePhone, IsNumber, IsString } from 'class-validator';


export class CreateBookingDto {
  @IsString()
  name: string;
  @IsNumber()
  phone: number;
  @IsNumber()
  price: number;
}