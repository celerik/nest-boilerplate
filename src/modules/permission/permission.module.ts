import { Module } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { PermissionController } from './permission.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionRepository } from '@modules/permission/permission.repository';
import { Pagination } from '@common/classes';
import { AuthModule } from '@modules/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([PermissionRepository]), AuthModule],
  controllers: [PermissionController],
  providers: [PermissionService, Pagination],
  exports: [PermissionService],
})
export class PermissionModule {}
