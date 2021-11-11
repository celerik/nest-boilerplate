import { Exclude, Expose, Type } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { SimplifiedRoleDto } from '@modules/role/dto';
import { SimplifiedPermissionDto } from '@modules/permission/dto';
import { Status } from '@common/enums';

@Exclude()
export class LoginUserDto {
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

  @ApiProperty({ required: false })
  @Expose()
  @IsOptional()
  @IsString()
  readonly authToken: string;
}