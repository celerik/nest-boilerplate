// @packages
import { Module } from '@nestjs/common';
// @scripts
import { DogsService } from './dogs.service';
import { DogsController } from './dog.controller';

@Module({
  controllers: [DogsController],
  providers: [DogsService],
})
export class DogsModule {}
