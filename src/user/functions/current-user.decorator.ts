import { createParamDecorator, ExecutionContext, UseInterceptors } from "@nestjs/common";

export const currentuser= createParamDecorator(
  (data: any, context: ExecutionContext) =>{
    const request = context.switchToHttp().getRequest();
    return request.currentuser;
  },
);