import { Dog } from '@app/dogs/dtos/dog.interface';
import { CreateDogsPayload } from '@app/dogs/payloads/create-dogs.payload';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DogsService {
  public getMessage(): string {
    return 'Woof!';
  }

  public getDogs(): Array<Dog> {
    return [
      {
        id: '1',
        name: 'Pepe',
      },
      {
        id: '2',
        name: 'Rick',
      },
      {
        id: '1',
        name: 'Angus',
      },
    ];
  }

  public createDog(payload: CreateDogsPayload): Dog {
    return {
      id: Date.now().toString(16),
      name: payload.name,
    };
  }
}
