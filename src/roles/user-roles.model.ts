import { Model, Table, Column, DataType, ForeignKey } from "sequelize-typescript"
import { ApiProperty } from '@nestjs/swagger/dist';
import { User } from "src/users/users.model";
import { Role } from "./roles.model";

@Table({ tableName: 'user_roles', createdAt: false, updatedAt: false })
export class UserRoles extends Model<UserRoles>{
    @ApiProperty({ example: '1', description: 'id связи' })
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;
    @ForeignKey(() => Role)
    @ApiProperty({ example: '1', description: 'Уникальный id роли' })
    @Column({ type: DataType.INTEGER })
    roleId: number;
    @ForeignKey(() => User)
    @ApiProperty({ example: '1', description: 'Уникальный id пользователя' })
    @Column({ type: DataType.INTEGER })
    userId: number;
}