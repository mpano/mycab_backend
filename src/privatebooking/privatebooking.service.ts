import { Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Privatebooking } from './privatebooking.entity';
import { PrivatebookingDto } from './dtos/privatebooking.dto';

@Injectable()
export class PrivatebookingService {
  constructor(
    @InjectRepository(Privatebooking) private repo: Repository<Privatebooking>,
  ) {}

  create(privatedto: PrivatebookingDto) {
    const pri = this.repo.create(privatedto);
    return this.repo.save(pri);
  }
  findall() {
    return this.repo.find();
  }
}
