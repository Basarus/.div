import { Controller, Get, UseGuards, Post, Body, Headers, UnauthorizedException, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger/dist';
import { AnswerService } from './answer.service';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles-auth.decorator';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { CreateReplyDto } from './dto/create-reply.dto';
import { JwtService } from "@nestjs/jwt";
import { AuthService } from 'src/auth/auth.service';

@ApiTags('Вопросы')
@Controller('answer')
export class AnswerController {

    constructor(
        private asnwerService: AnswerService,
        private jwtService: JwtService,
        private authService: AuthService
    ) { }

    @ApiOperation({ summary: 'Получение всех вопросов пользователей' })
    @ApiResponse({ status: 200 })
    @Roles('Администратор')
    @UseGuards(RolesGuard)
    @Get('/all')
    getQuestions() {
        return this.asnwerService.getRequests()
    }

    @ApiOperation({ summary: 'Написать вопрос' })
    @ApiResponse({ status: 200 })
    @Roles('Пользователь')
    @UseGuards(RolesGuard)
    @Post('/create')
    postQuestion(@Headers("Authorization") hash, @Body() dto: CreateAnswerDto) {
        const user = this.authService.checkUser(hash);
        if (!user) throw new UnauthorizedException({ message: 'Пользователь не авторизован' })
        return this.asnwerService.postQuestion(user, dto)
    }

    @ApiOperation({ summary: 'Ответ на вопрос пользователя' })
    @ApiResponse({ status: 200 })
    @Roles('Пользователь')
    @UseGuards(RolesGuard)
    @Post('/:id')
    putQuestion(@Param('id') id: string, @Body() dto: CreateReplyDto) {
        return this.asnwerService.putRequest(Number(id), dto)
    }

    @ApiOperation({ summary: 'Ответ на email пользователя' })
    @ApiResponse({ status: 200 })
    @Roles('Администратор')
    @UseGuards(RolesGuard)
    @Post('/email/:id')
    replyToEmail(@Param('id') id: string, @Body() dto: CreateReplyDto) {
        return this.asnwerService.replyToEmail(Number(id), dto)
    }

}
