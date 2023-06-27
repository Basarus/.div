import { Model, Table, Column, DataType, BelongsToMany } from "sequelize-typescript"
import { ApiProperty } from '@nestjs/swagger/dist';
import { User } from "src/users/users.model";
import { UserRoles } from "./user-roles.model";

interface IRoleCreationAttrbs {
    name: string,
}

@Table({ tableName: 'roles' })
export class Role extends Model<Role, IRoleCreationAttrbs>{
    @ApiProperty({ example: '1', description: 'Уникальный id роли' })
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;
    @ApiProperty({ example: 'Пользователь', description: 'Название роли' })
    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    name: string;
    @BelongsToMany(() => User, () => UserRoles)
    users: User[]
}