/** @packages */
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
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
  CreatePermissionDto,
  PermissionDto,
  ResponsePaginatePermissionsDto,
  ResponsePermissionDto,
  ResponsePermissionsDto,
  UpdatePermissionDto,
} from './dto';
import { PermissionService } from './permission.service';

@ApiTags('Permissions')
@ApiBearerAuth()
@Controller('permissions')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @ApiOperation({
    summary: 'Create permission',
    description: 'Section for the creation of a permission',
  })
  @ApiCreatedResponse({
    description: 'Permission successfully created',
    type: ResponsePermissionDto,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @ApiBody({ type: CreatePermissionDto })
  @Post()
  @PermissionAuth({ name: 'ADMIN-CREATE' })
  @UseGuards(AuthorizationGuard, PermissionAuthGuard)
  @UsePipes(ValidationPipe)
  async create(
    @Body() createPermissionDto: CreatePermissionDto,
  ): Promise<ResponseDto> {
    const permission: PermissionDto = await this.permissionService.create(
      createPermissionDto,
    );
    return plainToClass(ResponseDto, {
      message: 'Permission successfully created',
      data: { permission },
    });
  }

  @ApiOperation({
    summary: 'View all permissions paginated',
    description: 'Section to see all the permissions paginated',
  })
  @ApiNotFoundResponse({ description: 'Permissions not found' })
  @ApiOkResponse({
    description: 'Permissions loaded correctly',
    type: ResponsePaginatePermissionsDto,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @ApiQuery({ type: QueryDto })
  @Get()
  @PermissionAuth({ name: 'ADMIN-READ' })
  @UseGuards(AuthorizationGuard, PermissionAuthGuard)
  async getPermissionsPaginate(@Query() query: QueryDto): Promise<ResponseDto> {
    const permissions = await this.permissionService.findPaginate(query);
    return plainToClass(ResponseDto, {
      message: 'Permissions loaded correctly',
      data: { permissions },
    });
  }

  @ApiOperation({
    summary: 'View all permissions',
    description: 'Section to see all the permissions',
  })
  @ApiNotFoundResponse({ description: 'Permissions not found' })
  @ApiOkResponse({
    description: 'Permissions loaded correctly',
    type: ResponsePermissionsDto,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @Get('all')
  @PermissionAuth({ name: 'ADMIN-READ' })
  @UseGuards(AuthorizationGuard, PermissionAuthGuard)
  async getPermissions(): Promise<ResponseDto> {
    const permissions: PermissionDto[] = await this.permissionService.findAll();
    return plainToClass(ResponseDto, {
      message: 'Permissions loaded correctly',
      data: { permissions },
    });
  }

  @ApiOperation({
    summary: 'View permission',
    description: 'Section for the view of a permission',
  })
  @ApiNotFoundResponse({ description: 'Permission not found' })
  @ApiOkResponse({
    description: 'Permission loaded correctly',
    type: ResponsePermissionDto,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @Get('info/:id')
  @PermissionAuth({ name: 'ADMIN-READ' })
  @UseGuards(AuthorizationGuard, PermissionAuthGuard)
  async getPermission(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ResponseDto> {
    const permission: PermissionDto = await this.permissionService.findOne(id);
    return plainToClass(ResponseDto, {
      message: 'Permission loaded correctly',
      data: { permission },
    });
  }

  @ApiOperation({
    summary: 'Update permission',
    description: 'Section for the update of a permission',
  })
  @ApiNotFoundResponse({ description: 'Permission not found' })
  @ApiOkResponse({
    description: 'Permission successfully updated',
    type: ResponsePermissionDto,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @ApiBody({ type: UpdatePermissionDto })
  @Patch(':id')
  @PermissionAuth({ name: 'ADMIN-EDIT' })
  @UseGuards(AuthorizationGuard, PermissionAuthGuard)
  @UsePipes(ValidationPipe)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePermissionDto: UpdatePermissionDto,
  ): Promise<ResponseDto> {
    const permission: PermissionDto = await this.permissionService.update(
      id,
      updatePermissionDto,
    );
    return plainToClass(ResponseDto, {
      message: 'Permission successfully updated',
      data: { permission },
    });
  }

  @ApiOperation({
    summary: 'Delete permission',
    description: 'Section for the delete of a permission',
  })
  @ApiNotFoundResponse({ description: 'Permission not found' })
  @ApiOkResponse({
    description: 'Permission successfully deleted',
    type: ResponseDto,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @Delete(':id')
  @HttpCode(204)
  @PermissionAuth({ name: 'ADMIN-DELETE' })
  @UseGuards(AuthorizationGuard, PermissionAuthGuard)
  async delete(@Param('id', ParseIntPipe) id: number): Promise<ResponseDto> {
    const deletePermission: boolean = await this.permissionService.remove(id);
    if (deletePermission) {
      return plainToClass(ResponseDto, {
        message: 'Permission successfully deleted',
        data: {},
      });
    }
  }
}
