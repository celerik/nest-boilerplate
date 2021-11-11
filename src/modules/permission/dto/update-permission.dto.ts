import { PartialType } from '@nestjs/mapped-types';
import { CreatePermissionDto } from './create-permission.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, Length } from 'class-validator';
import { Status } from '../../../common/enums';

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
