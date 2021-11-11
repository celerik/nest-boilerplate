import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { PermissionAuthInterface } from '@common/interfaces';
import { User } from '@database/entities';
import { Reflector } from '@nestjs/core';

@Injectable()
export class PermissionAuthGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user as User;

    let permissionParams = this.reflector.get<PermissionAuthInterface>(
      'permission-auth',
      context.getHandler(),
    );

    if (!permissionParams) {
      permissionParams = this.reflector.get<PermissionAuthInterface>(
        'permission-auth',
        context.getClass(),
      );
    }

    if (!permissionParams) return true;
    if (!user) return true;

    const permissionValidated = user?.permissions.some(
      (permission) =>
        permission.name.toUpperCase() === permissionParams.name.toUpperCase(),
    );
    return !!permissionValidated;
  }
}
