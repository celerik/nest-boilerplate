/** @packages */
import { Exclude } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/** @module */
import { PermissionDto } from './index';

@Exclude()
export class ResponsePermissionsDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly message: string;

  @ApiProperty({ required: false })
  @IsNotEmpty()
  readonly data: {
    permissions: PermissionDto[];
  };
}
