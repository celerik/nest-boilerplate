/** @packages */
import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { getRepository } from 'typeorm';

/** @application */
import { Token } from '@database/entities';

@Injectable()
export class AuthorizationGuard extends AuthGuard('jwt') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    await super.canActivate(context);
    const request = context.switchToHttp().getRequest();
    const authorization = request.get('Authorization');
    if (authorization) {
      const token = authorization.replace('Bearer ', '');
      const tokenValidated = await getRepository(Token).findOne({
        token,
        status: 'ACTIVE',
      });
      if (!tokenValidated) {
        throw new UnauthorizedException();
      }
      return true;
    }
  }
}
