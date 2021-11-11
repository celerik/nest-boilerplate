import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto, ResponseLoginDto } from '@modules/auth/dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthRepository } from '@modules/auth/auth.repository';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';
import { User } from '@database/entities';
import { Status } from '@common/enums';
import { plainToClass } from 'class-transformer';
import { JwtPayloadInterface } from '@modules/auth/payloads';
import { SimplifiedRoleDto } from '@modules/role/dto';
import { SimplifiedPermissionDto } from '@modules/permission/dto';
import { LoginUserDto } from '@modules/user/dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthRepository)
    private readonly authRepository: AuthRepository,
    private readonly _jwtService: JwtService,
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
    const isMatch = await compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('invalid password');
    }
    const roles = plainToClass(SimplifiedRoleDto, user.roles);
    const permissions = plainToClass(SimplifiedPermissionDto, user.permissions);
    const payload: JwtPayloadInterface = {
      id: user.id,
      email: user.email,
      username: user.username,
      name: user.name,
      lastname: user.lastname,
      roles,
      permissions,
    };
    const token = this._jwtService.sign(payload);
    if (!token) {
      throw new UnauthorizedException(
        'Token not created due to internal error',
      );
    }
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
    const token = this._jwtService.sign(payload);
    return plainToClass(ResponseLoginDto, {
      user: { ...user, authToken: token },
    });
  }
}
