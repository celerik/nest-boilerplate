/** @packages */
import { Exclude, Expose, Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/** @application */
import { Status } from '@common/enums';
import { SimplifiedRoleDto } from '@modules/role/dto';
import { SimplifiedPermissionDto } from '@modules/permission/dto';

@Exclude()
export class UserDto {
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

  @ApiProperty({ required: false })
  @Expose()
  @IsNotEmpty()
  readonly phone: string;

  @ApiProperty({ required: true })
  @Expose()
  @IsNotEmpty()
  @Type(() => SimplifiedRoleDto)
  readonly roles: SimplifiedRoleDto[];

  @ApiProperty({ required: true })
  @Expose()
  @IsNotEmpty()
  @Type(() => SimplifiedPermissionDto)
  readonly permissions: SimplifiedPermissionDto[];

  @ApiProperty({ required: true, default: Status.ACTIVE })
  @Expose()
  @IsNotEmpty()
  readonly status: string;
}
