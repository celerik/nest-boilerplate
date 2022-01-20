/** @packages */
import { Exclude } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/** @module */
import { RoleDto } from './index';

@Exclude()
export class ResponseRolesDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly message: string;

  @ApiProperty({ required: false })
  @IsNotEmpty()
  readonly data: {
    roles: RoleDto[];
  };
}
