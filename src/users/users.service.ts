import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize'
import { User } from './users.model';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesService } from 'src/roles/roles.service';

@Injectable()
export class UsersService {

    constructor(
        @InjectModel(User) private userRepository: typeof User,
        private roleService: RolesService) {}

    async createUser(dto: CreateUserDto): Promise<User>  {
        const user = await this.userRepository.create(dto)
        const role = await this.roleService.getRoleById('Пользователь');
        await user.$set('roles', [role.id]);
        user.roles = [role];
        return user;
    }

    async getUserByEmail(email: string): Promise<User>  {
        const user = await this.userRepository.findOne({
            where: { email },
            include: { all: true }
        })
        return user;
    }

    async getUserById(id: number): Promise<User> {
        const user = await this.userRepository.findOne({
            where: { id },
            include: { all: true }
        })
        return user;
    }
}
