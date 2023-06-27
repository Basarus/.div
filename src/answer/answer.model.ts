import { Model, Table, Column, DataType, ForeignKey, HasOne } from "sequelize-typescript"
import { ApiProperty } from '@nestjs/swagger/dist';
import { User } from "src/users/users.model";

interface IAnswerCreationAttrbs {
    name: string,
    email: string,
    message: string,
}

@Table({ tableName: 'answers' })
export class Answer extends Model<Answer, IAnswerCreationAttrbs>{
    @ApiProperty({ example: '1', description: 'Уникальный id вопроса' })
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;
    @ForeignKey(() => User)
    @ApiProperty({ example: 'Митя', description: 'Имя пользователя' })
    @Column({ type: DataType.STRING, allowNull: false })
    name: string;
    @ApiProperty({ example: 'mitya@gmail.com', description: 'Email пользователя' })
    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    email: string;
    @ApiProperty({ example: 'Active', description: 'Статус ответа' })
    @Column({ type: DataType.STRING, allowNull: false })
    status: string;
    @ApiProperty({ example: 'Помогите мне найти ответ', description: 'Текст вопроса' })
    @Column({ type: DataType.STRING, allowNull: false })
    message: string;
    @ApiProperty({ example: 'Вот ответ на ваш вопрос', description: 'Текст ответа' })
    @Column({ type: DataType.STRING, allowNull: true })
    comment: string;
}