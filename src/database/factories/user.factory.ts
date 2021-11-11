import { define } from 'typeorm-seeding';
import Faker from 'faker';
import { User } from '../entities';

define(User, (faker: typeof Faker) => {
  const user = new User();
  const gender = faker.random.number();
  user.name = faker.name.firstName(gender);
  user.lastname = faker.name.lastName(gender);
  user.username = faker.name.jobTitle();
  user.email = faker.internet.email();
  user.phone = faker.phone.phoneNumber();
  user.password = 'password';
  return user;
});