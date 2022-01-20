/** @packages */
import { Exclude, Expose, Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/** @application */
import { LoginUserDto } from '@modules/user/dto/login-user.dto';

@Exclude()
export class ResponseLoginDto {
  @ApiProperty({ required: true, type: LoginUserDto })
  @Expose()
  @IsNotEmpty()
  @Type(() => LoginUserDto)
  readonly user: LoginUserDto;
}
