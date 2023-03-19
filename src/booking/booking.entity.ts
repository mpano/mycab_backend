import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class Booking{
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ name: 'full_name' })
  name: string;
  @Column()
  phone: number;
  @Column()
  price: number;

  @ManyToOne(() => User, (user) => user.booking)
  user: User;

}