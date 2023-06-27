import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger/dist';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { UserAuthDo } from './dto/user-auth.dto';
import { ValidationPipe } from 'src/pipes/validation.pipes';

@ApiTags("Авторизация")
@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService){}

    @ApiOperation({ summary: 'Авторизация пользователя' })
    @ApiResponse({ status: 200, type: 'jwt token' })
    @Post('/login')
    login(@Body() userDto: UserAuthDo){
        return this.authService.login(userDto)
    }

    @ApiOperation({ summary: 'Регистрация нового пользователя' })
    @ApiResponse({ status: 200, type: 'jwt token' })
    @UsePipes(ValidationPipe)
    @Post('/registration')
    registration(@Body() userDto: CreateUserDto){
       return this.authService.registration(userDto)
    }
}
