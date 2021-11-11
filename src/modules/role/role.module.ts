import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleRepository } from '@modules/role/role.repository';
import { PermissionModule } from '@modules/permission/permission.module';
import { AuthModule } from '@modules/auth/auth.module';
import { Pagination } from '@common/classes';

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
