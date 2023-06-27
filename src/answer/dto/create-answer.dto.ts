import { ApiProperty } from '@nestjs/swagger/dist';
export class CreateAnswerDto {
    @ApiProperty({ example: 'Помогите пожалуйста!', description: 'Текст вопроса' })
    readonly message: string;
}