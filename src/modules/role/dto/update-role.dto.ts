import { PartialType } from '@nestjs/mapped-types';
import { CreateRoleDto } from './create-role.dto';
import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { Status } from '../../../common/enums';

export class UpdateRoleDto extends PartialType(CreateRoleDto) {
  @ApiProperty({ required: true, minimum: 2, maximum: 150 })
  @IsOptional()
  @IsString()
  @Length(2, 150)
  readonly name: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  readonly description: string;

  @ApiProperty({ required: true, default: [1], type: [Number] })
  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  readonly permissions: number[];

  @ApiProperty({ required: false, default: Status.ACTIVE })
  @IsNotEmpty()
  readonly status: string;
}
