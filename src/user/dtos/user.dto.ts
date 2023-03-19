import { Expose } from 'class-transformer';

export class UserDto{

  @Expose()
  id: number;
  @Expose()
  name: string;
  @Expose()
  email: string;


}