import { Role, User } from '../entities';
import { Factory, Seeder } from 'typeorm-seeding';
import { getRepository } from 'typeorm';
import 'dotenv/config';

export default class CreateSuperAdminsSeed implements Seeder {
  public async run(factory: Factory): Promise<any> {
    const role: Role = await getRepository(Role).findOne({});
    const email = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASSWORD;
    console.log(' ...Seeding super admin... ');
    const user: User = await factory(User)().create({
      name: 'super',
      lastname: 'admin',
      username: 'admin',
      phone: '3001112233',
      email,
      password,
    });
    user.roles = [role];
    await user.save();
  }
}
