import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Booking } from '../booking/booking.entity';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  email: string;
  @Column()
  password: string;

  @Column({ default: false})
  admin: boolean;

  @OneToMany(() => Booking, (booking) => booking.user)
  booking: Booking[];
  @AfterInsert()
  loginsert(){
    console.log('the user saved successfully with email: ' + this.email);
  }
  @AfterUpdate()
  logupdated() {
    console.log('the user updated successfully with email: ' + this.email);
  }
  @AfterRemove()
  logdeleted(){
    console.log('the user deleted successfully with email: ' + this.email);
  }
}