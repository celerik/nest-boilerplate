/** @packages */
import { define } from 'typeorm-seeding';
import Faker from 'faker';

/** @application */
import { Permission } from '../entities';

define(Permission, (faker: typeof Faker) => {
  const permission = new Permission();
  permission.name = faker.random.word();
  permission.description = faker.random.words(4);
  return permission;
});
