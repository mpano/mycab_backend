import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { UserService } from './user.service';
import { scrypt as _scrypt, randomBytes} from  'crypto';
import { promisify} from 'util';
import * as buffer from "buffer";

const scrypt=promisify(_scrypt);
@Injectable()
export class AuthService{
  constructor(private userservice: UserService) {}

  async signup(name: string, email: string, password: string){
    // see if the email is taken or not
    const user=await  this.userservice.find(email);
    if(user.length){
      throw new BadRequestException('the email is taken');
    }
    // hashing and salt
    //salting
    const salt=randomBytes(8).toString('hex');
    //hashing
    const hash= (await scrypt(password,salt,32)) as Buffer;
    //joining them all
    const result= salt+"."+hash.toString('hex');
    //save user
    const users= await  this.userservice.create(name,email,result);
    return users;
  }

  async signin(email: string, password: string){
    const [user] = await this.userservice.find(email);
    if(!user){
      throw new NotFoundException('incorrect email');
    }
    const [salt, storehash] = user.password.split('.');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    if (hash.toString('hex') !== storehash) {
      throw new BadRequestException('the password is wrong');
    }
    return user;
  }
}