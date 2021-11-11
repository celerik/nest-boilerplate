import { Exclude, Expose } from 'class-transformer';
import { IsArray, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from '@modules/user/dto';

@Expose()
export class PaginateUsersDto {
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
  readonly items: UserDto[];

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
export class ResponsePaginateUsersDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly message: string;

  @ApiProperty({ required: false })
  @IsNotEmpty()
  readonly data: {
    users: PaginateUsersDto[];
  };
}
