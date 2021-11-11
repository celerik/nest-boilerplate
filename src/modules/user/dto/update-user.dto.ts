import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import {
  ArrayMinSize,
  IsArray,
  IsEmail,
  IsOptional,
  IsString,
  Length,
  MaxLength,
  MinLength,
  ValidateIf,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Status } from '../../../common/enums';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({ required: false, minimum: 2, maximum: 150 })
  @IsOptional()
  @IsString()
  @Length(2, 150)
  readonly name: string;

  @ApiProperty({ required: false, minimum: 2, maximum: 150 })
  @IsOptional()
  @IsString()
  @Length(2, 150)
  readonly lastname: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  readonly username: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsEmail()
  readonly email: string;

  @ApiProperty({ required: false, minimum: 10, maximum: 10 })
  @IsOptional()
  @IsString()
  @MinLength(10)
  @MaxLength(10)
  readonly phone: string;

  @ApiProperty({ required: false, type: [Number], default: [1] })
  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  readonly roles: number[];

  @ApiProperty({ required: false, minimum: 6 })
  @IsOptional()
  @IsString()
  @MinLength(6)
  readonly password: string;

  @ApiProperty({ required: false, minimum: 6 })
  @IsOptional()
  @IsString()
  @MinLength(6)
  @ValidateIf((o) => o.password === o.password_confirmation)
  readonly password_confirmation: string;

  @ApiProperty({
    required: false,
    minimum: 6,
    maximum: 8,
    default: Status.ACTIVE,
  })
  @IsOptional()
  @IsString()
  @MinLength(6)
  @MaxLength(8)
  readonly status: string;
}
