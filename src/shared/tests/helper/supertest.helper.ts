import { userData } from "../../../users/users.data";
import supertest from "supertest";
import { signJwt } from "../../utils/jwt.util";
import app from "../../../app";
import { User } from "../../../users/users.entity";
import { faker } from "@faker-js/faker";

const user1 = userData[0]!;

const token = signJwt({ id: user1.id, role: user1.role, email: user1.email });

export const unAuthedTestAgent = supertest(app);

export const autherdTestAgent = supertest
  .agent(app)
  .set("AUTHORIZATION", `Bearer ${token}`)
  .set("Accept", "application/json");

export const autherdTestAgentWithRole = (role: User["role"]) => {
  const userPayload = {
    id: faker.string.uuid(),
    email: faker.internet.email(),
    role,
  };
  const token = signJwt(userPayload);
  return supertest.agent(app).set("AUTHORIZATION", `Bearer ${token}`);
};
