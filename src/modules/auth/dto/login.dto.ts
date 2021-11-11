import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ required: true, default: 'admin' })
  @IsNotEmpty()
  @IsString()
  readonly username: string;

  @ApiProperty({ required: true, default: 'password' })
  @IsNotEmpty()
  @IsString()
  readonly password: string;
}
