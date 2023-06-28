import { Role } from "src/roles/roles.model";
import * as CONFIG from './config';
import { User } from "src/users/users.model";

export async function createTestDatabase() {
    let roles = await Role.findAll();
    if (roles.length <= 0) {
        CONFIG.ROLES.forEach(async e => Role.create({name: e}))
        const user = await User.create({email: 'admin@admin.ru', name: 'admin', password: 'admin'})
        const role = await this.roleService.getRoleById('Администратор');
        await user.$set('roles', [role.id]);
    }
}