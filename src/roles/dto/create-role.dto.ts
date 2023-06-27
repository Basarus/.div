import { ApiProperty } from '@nestjs/swagger/dist';
export class CreateRoleDto{
    @ApiProperty({example: 'Пользователь', description: 'Название роли'})
    readonly name: string;
}