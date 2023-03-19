import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {
  }
  create(name: string, email: string, password: string){
    const user = this.repo.create({ name, email, password });
    return this.repo.save(user);
  }
  findall() {
    return this.repo.find();
  }
  async findbyid(id: number): Promise<User> {
    const user = await this.repo.findOne({ where: { id } });
    if (!user) {

      throw new NotFoundException('the user with id:' + id + ' not found');
    }
    if(!id){
      return null;
    }
    return user;
  }
  async update(id: number, atr: Partial<User>) {
    const sa = await this.findbyid(id);
    if (!sa) {
      throw new NotFoundException('the user with id ' + id + ' is not exist');
    }
    Object.assign(sa, atr);
    return this.repo.save(sa);
  }
  async find(email: string) {
    const user = await this.repo.find({ where: { email } });
    if (!user) {
      throw new NotFoundException('there is no user with email' + email);
    }
    return user;
  }
  async remove(id: number){
    const user = await this.findbyid(id);
    if (!user) {
      throw new Error('there is no user with id: ' + id);
    }
    return this.repo.remove(user);
  }
}
