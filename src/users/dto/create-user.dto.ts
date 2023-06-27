import { ApiProperty } from '@nestjs/swagger/dist';
export class CreateUserDto{
    @ApiProperty({example: 'Витя', description: 'Имя пользователя'})
    readonly name: string;
    @ApiProperty({example: 'vitya@gmail.com', description: 'Email пользователя'})
    readonly email: string;
    @ApiProperty({example: '1234', description: 'Пароль пользователя'})
    readonly password: string;
}