import { ApiProperty } from '@nestjs/swagger/dist';
export class UserAuthDo{
    @ApiProperty({example: 'user@mail.ru', description: 'Email пользователя'})
    readonly email: string;
    @ApiProperty({example: '12345', description: 'Пароль пользователя'})
    readonly password: string;
}