import { Controller, Get, UseGuards, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger/dist';
import { AnswerService } from './answer.service';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles-auth.decorator';

@Controller('answer')
export class AnswerController {

    constructor(private asnwerService: AnswerService) { }

    @ApiOperation({ summary: 'Получение всех вопросов пользователей' })
    @ApiResponse({ status: 200 })
    @Roles('Администратор')
    @UseGuards(RolesGuard)
    @Get()
    getQuestions() {
        return this.asnwerService.getRequests()
    }



    @ApiOperation({ summary: 'Написать вопрос' })
    @ApiResponse({ status: 200 })
    @Roles('Пользователь')
    @UseGuards(RolesGuard)
    @Post()
    postQuestion() {
        return this.asnwerService.postQuestion()
    }

    @ApiOperation({ summary: 'Ответ на вопрос пользователя' })
    @ApiResponse({ status: 200 })
    @Roles('Администратор')
    @UseGuards(RolesGuard)
    @Post()
    putQuestion() {
        return this.asnwerService.getRequests()
    }

}
