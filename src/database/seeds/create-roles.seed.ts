import { Factory, Seeder } from 'typeorm-seeding';
import { Permission, Role } from '../entities';
import { getRepository } from 'typeorm';

export default class CreateRolesSeed implements Seeder {
  public roles = [
    {
      name: 'SUPER-ADMIN',
      description: 'Rol que tiene todos los permisos de la plataforma',
      permissions: [],
    },
    {
      name: 'ADMIN',
      description: 'Rol para los administradores de la plataforma',
      permissions: [1, 2, 3, 4, 5, 6],
    },
    {
      name: 'GENERAL',
      description: 'Rol para los usuarios normales de la plataforma',
      permissions: [1, 2],
    },
  ];

  public async run(factory: Factory): Promise<void> {
    let permissions: Permission[] = [];
    for (const role of this.roles) {
      if (role.name === 'SUPER-ADMIN') {
        permissions = await getRepository(Permission).find({});
      } else {
        permissions = await getRepository(Permission).findByIds(
          role.permissions,
        );
      }
      console.log(' ...Seeding roles... ');
      const createRole: Role = await factory(Role)().create({
        name: role.name,
        description: role.description,
        permissions: [],
      });
      createRole.permissions = permissions;
      await createRole.save();
    }
  }
}
