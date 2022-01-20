/** @packages */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UsePipes,
  ValidationPipe,
  Query,
  ParseIntPipe,
  NotFoundException,
  HttpCode,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';

/** @application */
import { PermissionAuth } from '@common/decotators';
import { QueryDto, ResponseDto } from '@common/dtos';
import { AuthorizationGuard, PermissionAuthGuard } from '@common/guards';

/** @module */
import {
  CreateUserDto,
  ResponsePaginateUsersDto,
  ResponseUserDto,
  ResponseUsersDto,
  UpdateUserDto,
  UserDto,
} from './dto';
import { UserService } from './user.service';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({
    summary: 'Create user',
    description: 'Section for the creation of a user',
  })
  @ApiCreatedResponse({
    description: 'User successfully created',
    type: ResponseUserDto,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @ApiBody({ type: CreateUserDto })
  @Post()
  @PermissionAuth({ name: 'USER-CREATE' })
  @UseGuards(AuthorizationGuard, PermissionAuthGuard)
  @UsePipes(ValidationPipe)
  async create(@Body() createUser: CreateUserDto): Promise<ResponseDto> {
    const user: UserDto = await this.userService.create(createUser);
    return plainToClass(ResponseDto, {
      message: 'User successfully created',
      data: { user },
    });
  }

  @ApiOperation({
    summary: 'View all users paginated',
    description: 'Section to see all the users paginated',
  })
  @ApiNotFoundResponse({ description: 'Users not found' })
  @ApiOkResponse({
    description: 'Users loaded correctly',
    type: ResponsePaginateUsersDto,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @ApiQuery({ type: QueryDto })
  @Get()
  @PermissionAuth({ name: 'USER-READ' })
  @UseGuards(AuthorizationGuard, PermissionAuthGuard)
  async findPaginate(@Query() query: QueryDto): Promise<ResponseDto> {
    const users = await this.userService.findPaginate(query);
    return plainToClass(ResponseDto, {
      message: 'Users loaded correctly',
      data: { users },
    });
  }

  @ApiOperation({
    summary: 'View all users',
    description: 'Section to see all the users',
  })
  @ApiNotFoundResponse({ description: 'Users not found' })
  @ApiOkResponse({
    description: 'Users loaded correctly',
    type: ResponseUsersDto,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @Get('all')
  @PermissionAuth({ name: 'USER-READ' })
  @UseGuards(AuthorizationGuard, PermissionAuthGuard)
  async findAll(): Promise<ResponseDto> {
    const users: UserDto[] = await this.userService.findAll();
    return plainToClass(ResponseDto, {
      message: 'Users loaded correctly',
      data: { users },
    });
  }

  @ApiOperation({
    summary: 'View user',
    description: 'Section for the view of a user',
  })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiOkResponse({
    description: 'User loaded correctly',
    type: ResponseUserDto,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @Get('info/:id')
  @PermissionAuth({ name: 'USER-READ' })
  @UseGuards(AuthorizationGuard, PermissionAuthGuard)
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<ResponseDto> {
    const user = await this.userService.findOne(id);
    return plainToClass(ResponseDto, {
      message: 'User loaded correctly',
      data: { user },
    });
  }

  @ApiOperation({
    summary: 'Update user',
    description: 'Section for the update of a user',
  })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiOkResponse({
    description: 'User successfully updated',
    type: ResponseUserDto,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @ApiBody({ type: UpdateUserDto })
  @Patch(':id')
  @PermissionAuth({ name: 'USER-EDIT' })
  @UseGuards(AuthorizationGuard, PermissionAuthGuard)
  @UsePipes(ValidationPipe)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUser: UpdateUserDto,
  ): Promise<ResponseDto> {
    const user: UserDto = await this.userService.update(id, updateUser);
    return plainToClass(ResponseDto, {
      message: 'User successfully updated',
      data: { user },
    });
  }

  @ApiOperation({
    summary: 'Delete user',
    description: 'Section for the delete of a user',
  })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiOkResponse({
    description: 'User successfully deleted',
    type: ResponseDto,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @Delete(':id')
  @HttpCode(204)
  @PermissionAuth({ name: 'USER-DELETE' })
  @UseGuards(AuthorizationGuard, PermissionAuthGuard)
  async remove(@Param('id', ParseIntPipe) id: number): Promise<ResponseDto> {
    const deleteUser = await this.userService.remove(id);
    if (deleteUser) {
      return plainToClass(ResponseDto, {
        message: 'User successfully deleted',
        data: {},
      });
    }
    throw new NotFoundException('User not deleted due to internal error');
  }
}
