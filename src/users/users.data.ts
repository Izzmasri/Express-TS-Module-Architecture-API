import { User } from "./users.entity";
import { faker } from "@faker-js/faker";
import { createRandomUser } from "../shared/seeds/users.seed";

export const userData: User[] = faker.helpers.multiple(createRandomUser, {
  count: 5,
});
