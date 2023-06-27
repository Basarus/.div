import { ApiProperty } from '@nestjs/swagger/dist';
import { IsString, Length, IsEmail} from 'class-validator';
export class CreateUserDto{
    @ApiProperty({example: 'Витя', description: 'Имя пользователя'})
    @IsString({message: 'Должно быть строкой'})
    readonly name: string;
    @ApiProperty({example: 'vitya@gmail.com', description: 'Email пользователя'})
    @IsString({message: 'Должно быть строкой'})
    @IsEmail({}, {message: 'Некорретный email'})
    readonly email: string;
    @ApiProperty({example: '1234', description: 'Пароль пользователя'})
    @IsString({message: 'Должно быть строкой'})
    @Length(4, 8, {message: 'Должно быть не менее 4 и не более 8 символов'})
    readonly password: string;
}