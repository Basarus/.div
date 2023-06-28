import { ApiProperty } from '@nestjs/swagger/dist';
export class CreateReplyDto {
    @ApiProperty({ example: 'Вот ответ на ваш вопрос', description: 'Текст ответа' })
    readonly message: string;
}