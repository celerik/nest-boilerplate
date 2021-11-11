import { IsNotEmpty, IsString, Length } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class SimplifiedRoleDto {
  @ApiProperty({ required: true, minimum: 1 })
  @Expose()
  @IsNotEmpty()
  readonly id: number;

  @ApiProperty({ required: true, minimum: 2, maximum: 150 })
  @Expose()
  @IsNotEmpty()
  @IsString()
  @Length(2, 150)
  readonly name: string;
}
