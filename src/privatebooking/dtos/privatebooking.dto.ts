import {
  IsDate,
  IsDateString,
  IsEmail,
  IsNumber,
  IsPhoneNumber,
  IsString, MaxLength,
  MinDate
} from 'class-validator';
import { Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

export class PrivatebookingDto{


  @IsString() 
  fname: string;
  @IsString()
  lname: string;
  @IsString()
  car: string;
  @IsEmail()
  email: string;
  @IsPhoneNumber('RW')
  phone: string;
  @IsString()
  pickup: string;
  @IsString()
  dropoff: string;
  @ApiProperty({ example: new Date('2023-01-01') })
  @IsDateString()
  date: Date;
}