import { Role } from "src/roles/roles.model";
import * as CONFIG from './config';

export async function createTestDatabase() {
    let roles = await Role.findAll();
    if (roles.length <= 0) CONFIG.ROLES.forEach(async e => Role.create({name: e}))
}