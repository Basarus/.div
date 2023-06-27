import { Controller, Body, Post, UsePipes } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger/dist';
import { User } from './users.model';
import { ValidationPipe } from 'src/pipes/validation.pipes';

@ApiTags("Управление пользователей")
@Controller('users')
export class UsersController {

   constructor(private userService: UsersService) { }

   @ApiOperation({ summary: 'Создание пользователя' })
   @ApiResponse({ status: 200, type: User })
   @UsePipes(ValidationPipe)
   @Post()
   create(@Body() userDto: CreateUserDto) {
      return this.userService.createUser(userDto)
   }
}
