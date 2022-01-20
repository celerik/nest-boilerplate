/** @packages */
import { Exclude } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/** @module */
import { RoleDto } from './index';

@Exclude()
export class ResponseRoleDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly message: string;

  @ApiProperty({ required: false })
  @IsNotEmpty()
  readonly data: {
    role: RoleDto;
  };
}
