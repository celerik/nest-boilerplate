/** @packages */
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass, plainToInstance } from 'class-transformer';
import { JwtService } from '@nestjs/jwt';

/** @application */
import { User } from '@database/entities';
import { Status } from '@common/enums';
import { TokenService } from '@modules/token/token.service';
import { SimplifiedRoleDto } from '@modules/role/dto';
import { SimplifiedPermissionDto } from '@modules/permission/dto';
import { LoginUserDto } from '@modules/user/dto/login-user.dto';

/** @module */
import { LoginDto, ResponseLoginDto } from './dto';
import { JwtPayloadInterface } from './payloads';
import { AuthRepository } from './auth.repository';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthRepository)
    private readonly authRepository: AuthRepository,
    private readonly jwtService: JwtService,
    private readonly _tokensService: TokenService,
  ) {}

  async login(loginDto: LoginDto): Promise<ResponseLoginDto> {
    const { username, password } = loginDto;
    const user: User = await this.authRepository.findUser(null, {
      username,
      status: Status.ACTIVE,
    });
    if (!user) {
      throw new NotFoundException('user does not exist');
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      throw new UnauthorizedException('invalid password');
    }
    const roles = plainToInstance(SimplifiedRoleDto, user.roles);
    const permissions = plainToInstance(
      SimplifiedPermissionDto,
      user.permissions,
    );
    const payload: JwtPayloadInterface = {
      id: user.id,
      email: user.email,
      username: user.username,
      name: user.name,
      lastname: user.lastname,
      roles,
      permissions,
    };
    const token = this.jwtService.sign(payload);
    if (!token) {
      throw new UnauthorizedException(
        'Token not created due to internal error',
      );
    }
    await this._tokensService.create({ token, user });
    return plainToClass(ResponseLoginDto, {
      user: { ...user, authToken: token },
    });
  }

  async validateToken(userId: number): Promise<LoginUserDto> {
    const user: User = await this.authRepository.findUser(userId, {
      status: Status.ACTIVE,
    });
    if (!user) {
      throw new NotFoundException('user does not exist');
    }
    return plainToClass(LoginUserDto, user);
  }

  async refreshToken(userId: number): Promise<ResponseLoginDto> {
    const user: User = await this.authRepository.findUser(null, {
      id: userId,
      status: Status.ACTIVE,
    });
    if (!user) {
      throw new NotFoundException('user does not exist');
    }
    const payload: JwtPayloadInterface = {
      id: user.id,
      email: user.email,
      username: user.username,
      name: user.name,
      lastname: user.lastname,
      roles: [],
      permissions: [],
    };
    const token = this.jwtService.sign(payload);
    await this._tokensService.create({ token, user });
    return plainToClass(ResponseLoginDto, {
      user: { ...user, authToken: token },
    });
  }

  async logout(userId: number): Promise<void> {
    const user: User = await this.authRepository.findUser(userId, {
      status: Status.ACTIVE,
    });
    if (!user) {
      throw new NotFoundException('user does not exist');
    }
    const deactivateResponse = await this._tokensService.deactivateAll(user);
    if (!deactivateResponse) {
      throw new NotFoundException('Token not deleted due to internal error');
    }
  }
}
