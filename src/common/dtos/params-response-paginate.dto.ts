import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ParamsResponsePaginateDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly dto: any;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsArray()
  readonly items: any[];

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsNumber()
  readonly total: number;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsNumber()
  readonly take: number;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsNumber()
  readonly page: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  readonly route: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  readonly keyword: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  readonly filters: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  readonly status: string;
}
