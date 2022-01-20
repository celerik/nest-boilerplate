/** @packages */
import { IsNotEmpty, IsString } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class SimplifiedPermissionDto {
  @ApiProperty({ required: true, default: 1, minimum: 1 })
  @Expose()
  @IsNotEmpty()
  readonly id: number;

  @ApiProperty({ required: true })
  @Expose()
  @IsNotEmpty()
  @IsString()
  readonly name: string;
}
