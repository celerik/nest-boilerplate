/** @packages */
import { Factory, Seeder } from 'typeorm-seeding';
import { getRepository } from 'typeorm';
import 'dotenv/config';

/** @application */
import { Role, User } from '../entities';

export default class CreateSuperAdminsSeed implements Seeder {
  public async run(factory: Factory): Promise<any> {
    const role: Role = await getRepository(Role).findOne({});
    const email = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASSWORD;
    const username = process.env.ADMIN_USERNAME;
    console.log(' ...Seeding super admin... ');
    const user: User = await factory(User)().create({
      name: 'super',
      lastname: 'admin',
      phone: '3001112233',
      email,
      password,
      username,
    });
    user.roles = [role];
    await user.save();
  }
}
