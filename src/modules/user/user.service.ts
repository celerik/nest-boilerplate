/** @packages */
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass, plainToInstance } from 'class-transformer';

/** @application */
import { Role, User } from '@database/entities';
import { Pagination } from '@common/classes';
import { PaginateDto, QueryDto } from '@common/dtos';
import { Status } from '@common/enums';
import { RoleService } from '@modules/role/role.service';

/** @module */
import { CreateUserDto, UpdateUserDto, UserDto } from './dto';
import { UserRepository } from '@modules/user/user.repository';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    private readonly _roleService: RoleService,
    private readonly pagination: Pagination,
  ) {}

  async create(user: CreateUserDto): Promise<UserDto> {
    const roles: Role[] = [];
    for (const role of user.roles) {
      const roleValue = await this._roleService.findRole(role);
      roles.push(roleValue);
    }
    const createdUser: User = await this.userRepository.save({
      ...user,
      roles,
    });
    return plainToClass(UserDto, createdUser);
  }

  async findPaginate(query: QueryDto): Promise<PaginateDto> {
    return this.pagination.getPaginate(
      {
        type: User,
        dto: UserDto,
        fields: ['name', 'lastname', 'username', 'email', 'phone'],
        relations: ['roles', 'roles.permissions'],
        route: 'users',
      },
      query,
      { status: 'ASC', name: 'ASC' },
    );
  }

  async findAll(): Promise<UserDto[]> {
    const users: User[] = await this.userRepository.find({
      relations: ['roles', 'roles.permissions'],
      order: { status: 'ASC', name: 'ASC' },
    });
    if (!users) {
      throw new NotFoundException('Users not found');
    }
    return plainToInstance(UserDto, users);
  }

  async findOne(id: number): Promise<UserDto> {
    const user: User = await this.findUser(id);
    return plainToClass(UserDto, user);
  }

  async findUser(id: number): Promise<User> {
    if (!id) {
      throw new BadRequestException('User id must be sent');
    }
    const user: User = await this.userRepository.findUser(id, {
      status: Status.ACTIVE,
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async update(id: number, updateUser: UpdateUserDto): Promise<UserDto> {
    const user: User = await this.findUser(id);
    let roles: Role[] = user.roles;
    if (updateUser?.roles?.length > 0) {
      roles = [];
      for (const role of updateUser.roles) {
        const roleValue = await this._roleService.findRole(role);
        roles.push(roleValue);
      }
    }
    user.name = updateUser.name ?? user.name;
    user.lastname = updateUser.lastname ?? user.lastname;
    user.username = updateUser.username ?? user.username;
    user.email = updateUser.email ?? user.email;
    user.phone = updateUser.phone ?? user.phone;
    user.status = updateUser.status ?? user.status;
    if (updateUser.password) {
      user.password = updateUser.password;
    }
    user.roles = roles;
    await user.save();
    return plainToClass(UserDto, user);
  }

  async remove(id: number): Promise<boolean> {
    const user: User = await this.findUser(id);
    if (user) {
      const deleteUser = await this.userRepository.softDelete(id);
      return !!deleteUser;
    }
    return false;
  }
}
