/** @packages */
import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class SimplifiedUserDto {
  @ApiProperty({ required: true, default: 1, minimum: 1 })
  @Expose()
  @IsNotEmpty()
  readonly id: number;

  @ApiProperty({ required: true })
  @Expose()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({ required: false })
  @Expose()
  @IsNotEmpty()
  readonly lastname: string;

  @ApiProperty({ required: true })
  @Expose()
  @IsNotEmpty()
  readonly username: string;

  @ApiProperty({ required: true })
  @Expose()
  @IsNotEmpty()
  readonly email: string;
}
