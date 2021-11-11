import { IsNumberString, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class QueryDto {
  @ApiProperty({ required: false, default: 1, minimum: 1 })
  @IsOptional()
  @IsNumberString()
  readonly page: number;

  @ApiProperty({ required: false, default: 10, minimum: 1 })
  @IsOptional()
  @IsNumberString()
  readonly limit: number;

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
