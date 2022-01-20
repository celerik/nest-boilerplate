/** @packages */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

/** @module */
import { DatabaseProvider } from './database.provider';

@Module({
  imports: [TypeOrmModule, DatabaseProvider],
  exports: [DatabaseProvider],
})
export class DatabaseModule {}
