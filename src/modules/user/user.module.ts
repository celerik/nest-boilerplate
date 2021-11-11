import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '@modules/user/user.repository';
import { RoleModule } from '@modules/role/role.module';
import { AuthModule } from '@modules/auth/auth.module';
import { Pagination } from '@common/classes';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository]), RoleModule, AuthModule],
  controllers: [UserController],
  providers: [UserService, Pagination],
  exports: [UserService],
})
export class UserModule {}
