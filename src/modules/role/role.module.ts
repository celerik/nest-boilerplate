/** @packages */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

/** @application */
import { Pagination } from '@common/classes';
import { AuthModule } from '@modules/auth/auth.module';
import { PermissionModule } from '@modules/permission/permission.module';

/** @module */
import { RoleController } from './role.controller';
import { RoleRepository } from './role.repository';
import { RoleService } from './role.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([RoleRepository]),
    PermissionModule,
    AuthModule,
  ],
  controllers: [RoleController],
  providers: [RoleService, Pagination],
  exports: [RoleService],
})
export class RoleModule {}
