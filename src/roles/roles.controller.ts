import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger/dist';
import { Role } from './roles.model';

@ApiTags("Управление ролями")
@Controller('roles')
export class RolesController {
    constructor(private roleService: RolesService) { }

    @ApiOperation({summary: 'Создание роли'})
    @ApiResponse({status: 200, type: Role})
    @Post()
    create(@Body() dto: CreateRoleDto) {
        return this.roleService.create(dto)
    }

    @ApiOperation({summary: 'Поиск роли по названию'})
    @ApiResponse({status: 200, type: Role})
    @Get('/:name')
    getByName(@Param('name') name: string) {
        return this.roleService.getRoleById(name)
    }
}
