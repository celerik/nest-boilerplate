import { Module } from '@nestjs/common';
import { DogsModule } from '@app/dogs/dogs.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [DogsModule, SharedModule],
})
export class AppModule {}
