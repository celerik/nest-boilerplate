import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
  NotFoundException,
  UsePipes,
  ValidationPipe,
  Query,
  HttpCode,
} from '@nestjs/common';
import { RoleService } from './role.service';
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
import { QueryDto, ResponseDto } from '@common/dtos';
import { AuthGuard } from '@nestjs/passport';
import { PermissionAuthGuard } from '@common/guards';
import { plainToClass } from 'class-transformer';
import { PermissionAuth } from '@common/decotators';
import {
  CreateRoleDto,
  ResponsePaginateRolesDto,
  ResponseRoleDto,
  ResponseRolesDto,
  RoleDto,
  UpdateRoleDto,
} from '@modules/role/dto';

@ApiTags('Roles')
@ApiBearerAuth()
@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @ApiOperation({
    summary: 'Create role',
    description: 'Section for the creation of a role',
  })
  @ApiCreatedResponse({
    description: 'Role successfully created',
    type: ResponseRoleDto,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @ApiBody({ type: CreateRoleDto })
  @Post()
  @PermissionAuth({ name: 'ADMIN-CREATE' })
  @UseGuards(AuthGuard(), PermissionAuthGuard)
  @UsePipes(ValidationPipe)
  async create(@Body() createRole: CreateRoleDto): Promise<ResponseDto> {
    const role: RoleDto = await this.roleService.create(createRole);
    return plainToClass(ResponseDto, {
      message: 'Role successfully created',
      data: { role },
    });
  }

  @ApiOperation({
    summary: 'View all roles paginated',
    description: 'Section to see all the roles paginated',
  })
  @ApiNotFoundResponse({ description: 'Roles not found' })
  @ApiOkResponse({
    description: 'Roles loaded correctly',
    type: ResponsePaginateRolesDto,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @ApiQuery({ type: QueryDto })
  @Get()
  @PermissionAuth({ name: 'ADMIN-READ' })
  @UseGuards(AuthGuard(), PermissionAuthGuard)
  async findPaginate(@Query() query: QueryDto): Promise<ResponseDto> {
    const roles = await this.roleService.findPaginate(query);
    return plainToClass(ResponseDto, {
      message: 'Roles loaded correctly',
      data: { roles },
    });
  }

  @ApiOperation({
    summary: 'View all roles',
    description: 'Section to see all the roles',
  })
  @ApiNotFoundResponse({ description: 'Roles not found' })
  @ApiOkResponse({
    description: 'Roles loaded correctly',
    type: ResponseRolesDto,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @Get('all')
  @PermissionAuth({ name: 'ADMIN-READ' })
  @UseGuards(AuthGuard(), PermissionAuthGuard)
  async findAll(): Promise<ResponseDto> {
    const roles = await this.roleService.findAll();
    return plainToClass(ResponseDto, {
      message: 'Roles loaded correctly',
      data: { roles },
    });
  }

  @ApiOperation({
    summary: 'View role',
    description: 'Section for the view of a role',
  })
  @ApiNotFoundResponse({ description: 'Role not found' })
  @ApiOkResponse({
    description: 'Role loaded correctly',
    type: ResponseRoleDto,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @Get('info/:id')
  @PermissionAuth({ name: 'ADMIN-READ' })
  @UseGuards(AuthGuard(), PermissionAuthGuard)
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<ResponseDto> {
    const role = await this.roleService.findOne(id);
    return plainToClass(ResponseDto, {
      message: 'Role loaded correctly',
      data: { role },
    });
  }

  @ApiOperation({
    summary: 'Update role',
    description: 'Section for the update of a role',
  })
  @ApiNotFoundResponse({ description: 'Role not found' })
  @ApiOkResponse({
    description: 'Role successfully updated',
    type: ResponseRoleDto,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @ApiBody({ type: UpdateRoleDto })
  @Patch(':id')
  @PermissionAuth({ name: 'ADMIN-EDIT' })
  @UseGuards(AuthGuard(), PermissionAuthGuard)
  @UsePipes(ValidationPipe)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRole: UpdateRoleDto,
  ): Promise<ResponseDto> {
    const role: RoleDto = await this.roleService.update(id, updateRole);
    return plainToClass(ResponseDto, {
      message: 'Role successfully updated',
      data: { role },
    });
  }

  @ApiOperation({
    summary: 'Delete role',
    description: 'Section for the delete of a role',
  })
  @ApiNotFoundResponse({ description: 'Role not found' })
  @ApiOkResponse({
    description: 'Role successfully deleted',
    type: ResponseDto,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @Delete(':id')
  @HttpCode(204)
  @PermissionAuth({ name: 'ADMIN-DELETE' })
  @UseGuards(AuthGuard(), PermissionAuthGuard)
  async remove(@Param('id', ParseIntPipe) id: number): Promise<ResponseDto> {
    const deleteRole = await this.roleService.remove(id);
    if (deleteRole) {
      return plainToClass(ResponseDto, {
        message: 'Role successfully deleted',
        data: {},
      });
    }
    throw new NotFoundException('Role not deleted due to internal error');
  }
}
