/** @packages */
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto {
  @ApiProperty({ required: true, minimum: 2, maximum: 150 })
  @IsNotEmpty()
  @IsString()
  @Length(2, 150)
  readonly name: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  readonly description: string;

  @ApiProperty({ required: true, default: [1], type: [Number] })
  @IsArray()
  @ArrayMinSize(1)
  readonly permissions: number[];
}
