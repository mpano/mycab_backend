import { Injectable, NestMiddleware } from '@nestjs/common';
import { UserService } from '../user.service';
import { NextFunction } from 'express';
 @Injectable()
 export class CurrentUserMiddleware implements NestMiddleware{
  constructor(private userservice: UserService) {}
 async  use(req: any, res: any, next: NextFunction) {

    const { userId } = req.session || {};
    if(userId){
      const user = await this.userservice.findbyid(userId);
      req.currentuser = user;
    }
    next();
  }
}