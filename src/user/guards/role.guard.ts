import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

export class RoleGuard implements CanActivate{
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable <boolean> {
    const request = context.switchToHttp().getRequest();
    if(!request.currentuser){
      return false;
    }
    return request.currentuser.admin;
  }
}