/** @packages */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

/** @application */
import { Pagination } from '@common/classes';
import { AuthModule } from '@modules/auth/auth.module';

/** @module */
import { PermissionController } from './permission.controller';
import { PermissionRepository } from './permission.repository';
import { PermissionService } from './permission.service';

@Module({
  imports: [TypeOrmModule.forFeature([PermissionRepository]), AuthModule],
  controllers: [PermissionController],
  providers: [PermissionService, Pagination],
  exports: [PermissionService],
})
export class PermissionModule {}
