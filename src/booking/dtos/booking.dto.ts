import { Expose, Transform } from "class-transformer";

export class BookingDto{
  @Expose()
  id: number;
  
  @Expose()
  name: string;
  @Expose()
  phone: number;
  @Expose()
  price: number;

  @Transform(({ obj }) => obj.user.id)
  @Expose()
  userId: number;
}