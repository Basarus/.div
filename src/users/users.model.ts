import { Model, Table, Column, DataType , BelongsToMany, HasOne} from "sequelize-typescript"
import { ApiProperty } from '@nestjs/swagger/dist';
import { Role } from "src/roles/roles.model";
import { UserRoles } from "src/roles/user-roles.model";
import { Answer } from "src/answer/answer.model";

interface IUserCreationAttrbs{
    email: string,
    password: string
}

@Table({ tableName: 'users' })
export class User extends Model<User, IUserCreationAttrbs>{
    @ApiProperty({example: '1', description: 'Уникальный id пользователя'})
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;
    @ApiProperty({example: 'vitya@gmail.com', description: 'Email пользователя'})
    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    email: string;
    @ApiProperty({example: '1234', description: 'Пароль пользователя'})
    @Column({ type: DataType.STRING, allowNull: false })
    password: string;
    @BelongsToMany(() => Role, () => UserRoles)
    roles: Role[]
    @HasOne(() => Answer, () => User)
    aswers: Answer[]
}