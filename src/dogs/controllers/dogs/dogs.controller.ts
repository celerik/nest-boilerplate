// @packages
import { Body, Controller, Get, Post } from '@nestjs/common';

// @scripts
import { DogsService } from '@app/dogs/services/dogs/dogs.service';
import { CreateDogsPayload } from '@app/dogs/payloads/create-dogs.payload';

@Controller('dogs')
export class DogsController {
  constructor(private dogsService: DogsService) {}

  @Get('/')
  public index() {
    return { message: this.dogsService.getMessage() };
  }

  @Get('/list')
  public getDogs() {
    return this.dogsService.getDogs();
  }

  @Post('/create')
  public createDog(@Body() payload: CreateDogsPayload) {
    const created = this.dogsService.createDog(payload);

    return {
      message: 'The item was created successfully!',
      item: created,
    };
  }
}
