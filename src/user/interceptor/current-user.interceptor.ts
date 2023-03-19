import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable } from 'rxjs';
import { UserService } from '../user.service';
@Injectable()
export class CurrentUserInterceptor implements NestInterceptor{
  constructor(private userservice: UserService) {}
  async intercept(context: ExecutionContext, next: CallHandler<any>) {
    const request = context.switchToHttp().getRequest();
    const { userId } = request.session || {};

    if (userId) {
      const user = await this.userservice.findbyid(userId);
      request.currentuser = user;
    }

    return next.handle();
  }
  
}