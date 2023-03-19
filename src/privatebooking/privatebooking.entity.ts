import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Privatebooking {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  fname: string;
  @Column()
  lname: string;
  @Column()
  car: string;
  @Column()
  email: string;
  @Column()
  phone: string;
  @Column()
  pickup: string;
  @Column()
  dropoff: string;
  @Column({ default: new Date()})
  date: Date;
}