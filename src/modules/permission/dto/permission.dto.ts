import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { Status } from '../../../common/enums';

@Exclude()
export class PermissionDto {
  @ApiProperty({ required: true, default: 1, minimum: 1 })
  @Expose()
  @IsNotEmpty()
  readonly id: number;

  @ApiProperty({ required: true })
  @Expose()
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty({ required: false })
  @Expose()
  @IsOptional()
  readonly description: string;

  @ApiProperty({ required: false, default: Status.ACTIVE })
  @Expose()
  @IsNotEmpty()
  readonly status: string;
}
