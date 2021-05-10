import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './services/app.service';
import { DogsModule } from './models/dogs/dog.module';

@Module({
  imports: [DogsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
