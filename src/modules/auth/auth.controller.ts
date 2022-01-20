/** @packages */
import {
  Controller,
  Get,
  Post,
  Body,
  HttpCode,
  UsePipes,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

/** @application */
import { UserAuth } from '@common/decotators';
import { AuthorizationGuard } from '@common/guards';
import { LoginUserDto } from '@modules/user/dto';

/** @module */
import { LoginDto, ResponseLoginDto } from './dto';
import { AuthService } from './auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: 'Login',
    description: 'Section for the login of user',
  })
  @ApiOkResponse({
    description: 'Login correctly',
    type: ResponseLoginDto,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @Post('/login')
  @HttpCode(200)
  @UsePipes(ValidationPipe)
  signIn(@Body() loginDto: LoginDto): Promise<ResponseLoginDto> {
    return this.authService.login(loginDto);
  }

  @ApiOperation({
    summary: 'Validate token',
    description: 'Section for the validate token',
  })
  @ApiOkResponse({
    description: 'Token validated correctly',
    type: LoginUserDto,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @ApiBearerAuth()
  @Get('/validate-token')
  @UseGuards(AuthorizationGuard)
  validateToken(@UserAuth('id') userId: number): Promise<LoginUserDto> {
    return this.authService.validateToken(userId);
  }

  @ApiOperation({
    summary: 'Refresh token',
    description: 'Section for the refresh token',
  })
  @ApiOkResponse({
    description: 'Token validated correctly',
    type: ResponseLoginDto,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @ApiBearerAuth()
  @Get('/refresh-token')
  @UseGuards(AuthorizationGuard)
  refreshToken(@UserAuth('id') userId: number): Promise<ResponseLoginDto> {
    return this.authService.refreshToken(userId);
  }

  @ApiOperation({
    summary: 'Logout',
    description: 'Section for the logout',
  })
  @ApiOkResponse({
    description: 'Logout correctly',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @ApiBearerAuth()
  @Post('/logout')
  @HttpCode(204)
  @UseGuards(AuthorizationGuard)
  async signOut(@UserAuth('id') userId: number): Promise<void> {
    await this.authService.logout(userId);
  }
}
