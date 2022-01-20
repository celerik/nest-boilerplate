/** @packages */
import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, Length } from 'class-validator';

/** @application */
import { Status } from '../../../common/enums';

/** @module */
import { CreatePermissionDto } from './index';

export class UpdatePermissionDto extends PartialType(CreatePermissionDto) {
  @ApiProperty({ required: true, minimum: 2, maximum: 150 })
  @IsOptional()
  @IsString()
  @Length(2, 150)
  readonly name: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  readonly description: string;

  @ApiProperty({ required: false, default: Status.ACTIVE })
  @IsOptional()
  @IsString()
  readonly status: string;
}
