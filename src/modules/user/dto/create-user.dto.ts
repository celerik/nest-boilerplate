import {
  ArrayMinSize,
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ required: true, minimum: 2, maximum: 150 })
  @IsNotEmpty()
  @IsString()
  @Length(2, 150)
  readonly name: string;

  @ApiProperty({ required: true, minimum: 2, maximum: 150 })
  @IsOptional()
  @IsString()
  @Length(2, 150)
  readonly lastname: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly username: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @ApiProperty({ required: false, minimum: 7, maximum: 12 })
  @IsOptional()
  @IsString()
  @MinLength(7)
  @MaxLength(12)
  readonly phone: string;

  @ApiProperty({ required: true, type: [Number], default: [1] })
  @IsArray()
  @ArrayMinSize(1)
  readonly roles: number[];

  @ApiProperty({ required: true, minimum: 6 })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  readonly password: string;
}
