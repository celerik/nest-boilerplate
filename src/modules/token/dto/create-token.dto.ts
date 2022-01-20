/** @packages */
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

/** @application */
import { User } from '@database/entities/User';

export class CreateTokenDto {
  @IsNotEmpty()
  @IsString()
  token: string;

  @IsOptional()
  @Type(() => User)
  user: User;
}
