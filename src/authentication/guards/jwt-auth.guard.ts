import { AuthGuard } from '@nestjs/passport';
import { ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from '@nestjs/core';
import { PUBLIC_KEY } from "../../decorators/public.decorator";
import { Observable } from "rxjs";

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublicRoute = this.reflector.get<boolean>(
      PUBLIC_KEY,
      context.getHandler(),
    );
    if (isPublicRoute) return true;
    return super.canActivate(context);
  }
}
