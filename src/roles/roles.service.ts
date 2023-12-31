import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize'
import { Role } from './roles.model';
import { CreateRoleDto } from './dto/create-role.dto';

@Injectable()
export class RolesService {

  constructor(@InjectModel(Role) private roleRepository: typeof Role) { }

  async create(dto: CreateRoleDto): Promise<Role> {
    const role = await this.roleRepository.create(dto)
    return role
  }

  async getRoleById(name: string): Promise<Role> {
    const role = await this.roleRepository.findOne({
      where: { name }
    })
    return role
  }
}
