import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePermissionDto {
  @ApiProperty({ required: true, minimum: 2, maximum: 150 })
  @IsNotEmpty()
  @IsString()
  @Length(2, 150)
  readonly name: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  readonly description: string;
}
