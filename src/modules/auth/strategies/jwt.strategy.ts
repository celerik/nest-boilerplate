import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthRepository } from '../auth.repository';
import { ConfigService } from '@nestjs/config';
import { Configuration } from '@common/enums';
import { JwtPayloadInterface } from '@modules/auth/payloads';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly _configService: ConfigService,
    @InjectRepository(AuthRepository)
    private readonly _authRepository: AuthRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: _configService.get(Configuration.JWT_SECRET),
    });
  }

  async validate(payload: JwtPayloadInterface): Promise<JwtPayloadInterface> {
    const { username } = payload;
    const user = await this._authRepository.findOne({
      where: { username, status: 'ACTIVE' },
    });
    if (!user) {
      throw new UnauthorizedException();
    }
    return payload;
  }
}