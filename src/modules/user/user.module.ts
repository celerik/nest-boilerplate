/** @packages */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

/** @application */
import { Pagination } from '@common/classes';
import { RoleModule } from '@modules/role/role.module';
import { AuthModule } from '@modules/auth/auth.module';

/** @module */
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository]), RoleModule, AuthModule],
  controllers: [UserController],
  providers: [UserService, Pagination],
  exports: [UserService],
})
export class UserModule {}
