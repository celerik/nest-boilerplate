import { Injectable } from '@nestjs/common';
import { Dog } from './dog.interface';
import { CreateDogsPayload } from './create-dog.payload';

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
