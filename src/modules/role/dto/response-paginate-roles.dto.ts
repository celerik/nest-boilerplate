/** @packages */
import { Exclude, Expose } from 'class-transformer';
import { IsArray, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/** @module */
import { RoleDto } from './index';

@Expose()
export class PaginateRolesDto {
  @ApiProperty({ required: true, default: 0, minimum: 0 })
  @IsNotEmpty()
  @IsNumber()
  readonly total: number;

  @ApiProperty({ required: true, default: 10, minimum: 1 })
  @IsNotEmpty()
  @IsNumber()
  readonly limit: number;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsArray()
  readonly items: RoleDto[];

  @ApiProperty({ required: true, default: null })
  @IsNotEmpty()
  @IsNumber()
  readonly currentPage: number | string;

  @ApiProperty({ required: true, default: null })
  @IsNumber()
  readonly nextPage: number | string;

  @ApiProperty({ required: true, default: null })
  @IsNumber()
  readonly prevPage: number | string;

  @ApiProperty({ required: true, default: null })
  @IsNumber()
  readonly lastPage: number | string;
}

@Exclude()
export class ResponsePaginateRolesDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly message: string;

  @ApiProperty({ required: false })
  @IsNotEmpty()
  readonly data: {
    roles: PaginateRolesDto[];
  };
}
