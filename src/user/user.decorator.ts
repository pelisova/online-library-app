import { createParamDecorator, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { User } from './user.entity';

export const GetAdminUser = createParamDecorator(
  (data: {"id":"10"}, ctx: ExecutionContext): User => {
    const request = ctx.switchToHttp().getRequest();
    let user: User =  request.user;
    if (user.role === "A")
      return user
    
    throw new UnauthorizedException("You are not authorized to access this resource.")
  }
);

export const GetLibrarianUser = createParamDecorator(
  (data: {"id":"10"}, ctx: ExecutionContext): User => {
    const request = ctx.switchToHttp().getRequest();
    let user: User =  request.user;
    if (user.role === "L" || user.role === "A")
      return user
    
    throw new UnauthorizedException("You are not authorized to access this resource.")
  }
);

export const GetMemberUser = createParamDecorator(
  (data: {"id":"10"}, ctx: ExecutionContext): User => {
    const request = ctx.switchToHttp().getRequest();
    let user: User =  request.user;
    if (user.role === "M" || user.role === "L" || user.role === "A")
      return user
    
    throw new UnauthorizedException("You are not authorized to access this resource.")
  }
);

// example from docs
// export const GetUser = createParamDecorator(
  //   (data: {"id":"10"}, ctx: ExecutionContext): User => {
  //     const request = ctx.switchToHttp().getRequest();
  //     return request.user;
  //   },
  // );