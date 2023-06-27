import { ApiProperty } from '@nestjs/swagger/dist';
export class CreateReplyDto {
    @ApiProperty({ example: '1', description: 'Уникальный Id вопроса' })
    readonly id: number;
    @ApiProperty({ example: 'Вот ответ на ваш вопрос', description: 'Текст ответа' })
    readonly message: string;
}