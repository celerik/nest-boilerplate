/** @packages */
import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ParamsPaginateDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly type: any;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly dto: any;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly route: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsArray()
  readonly fields: string[];

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsArray()
  readonly relations: string[];
}
