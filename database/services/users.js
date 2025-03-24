// database\services\users.js

import { faker } from "@faker-js/faker";
import avatars from "./avatars.js";

const users = [];

const userLength = 2;

for (let i = 0; i < userLength; i += 1) {
  const randomDate = faker.date.past().toISOString().split("T")[0];

  users.push({
    name: faker.person.firstName(),
    email: faker.internet.email(),
    naissance: randomDate,
    civility: faker.number.binary({ min: 0, max: 1 }),
    hashed_password: faker.internet.password(),
    IsAdmin: 0,
    avatarId: faker.number.int({ min: 1, max: avatars.length }),
  });
}

export default users;
