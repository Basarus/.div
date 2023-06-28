import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize'
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UsersService } from 'src/users/users.service';
import { CreateReplyDto } from './dto/create-reply.dto';
import { Answer } from './answer.model';
import * as postmail from '../nodemailer/index'
import { User } from 'src/users/users.model';

@Injectable()
export class AnswerService {

    constructor(
        private userService: UsersService,
        @InjectModel(Answer) private answerRepository: typeof Answer
    ) { }

    async getRequests(): Promise<Answer[]> {
        const answers = await this.answerRepository.findAll();
        return answers
    }

    async putRequest(id: number, dto: CreateReplyDto) {
        const answer = await this.answerRepository.findOne({
            where: { id }
        })
        if (!answer) throw new HttpException('Сообщения с данным ID не существует', HttpStatus.BAD_REQUEST);
        if (answer.status == 'Resolved') throw new HttpException('Данный вопрос уже имеет ответ', HttpStatus.BAD_REQUEST);
        answer.comment = dto.message;
        answer.status = 'Resolved';
        await answer.save()
        throw new HttpException('Ответ успешно добавлен', HttpStatus.OK);
    }

    async postQuestion(user: User, dto: CreateAnswerDto): Promise<Answer> {
        const answer = await this.answerRepository.create({ ...dto, userId: user.id })
        return answer
    }

    async replyToEmail(id: number, dto: CreateReplyDto) {
        const answer = await this.answerRepository.findOne({
            where: { id }
        })
        const user = await this.userService.getUserById(Number(answer.userId))
        if (!user) throw new HttpException('Пользователь не найден', HttpStatus.BAD_REQUEST);
        if (!answer) throw new HttpException('Сообщения с данным ID не существует', HttpStatus.BAD_REQUEST);
        if (answer.status == 'Resolved') throw new HttpException('Данный вопрос уже имеет ответ', HttpStatus.BAD_REQUEST);
        answer.comment = dto.message;
        answer.status = 'Resolved';
        await answer.save()
        if (await postmail.sendMail(user.email, user.name, answer.message, answer.comment))
            throw new HttpException('Ответ успешно добавлен', HttpStatus.OK);
        else throw new HttpException('Возникла ошибка при отправке сообщения', HttpStatus.BAD_REQUEST);
    }
}
