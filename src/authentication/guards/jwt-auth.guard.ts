import { AuthGuard } from '@nestjs/passport';
import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from '@nestjs/core';
import { PUBLIC_KEY } from "../../decorators/public.decorator";

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext): boolean {
    const isPublicRoute = this.reflector.get(PUBLIC_KEY, context.getHandler());
    if (isPublicRoute) return true;
    return false;
  }
}
