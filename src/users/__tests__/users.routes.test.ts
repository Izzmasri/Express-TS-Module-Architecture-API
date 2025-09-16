import { createRandomUser } from "../../shared/seeds/users.seed";
import {
  autherdTestAgent,
  unAuthedTestAgent,
} from "../../shared/tests/helper/supertest.helper";
import { UserRepository } from "../users.repository";

describe("users routes endpoint", () => {
  describe("GET /api/v1/users", () => {
    it("with unauthed agent will throw error", async () => {
      const response = await unAuthedTestAgent.get("/api/v1/users");
      expect(response.status).toBe(401);
    });

    it("should return array of users", async () => {
      const response = await autherdTestAgent.get("/api/v1/users");
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({
        message: "success",
        results: response.body.data.length,
        data: expect.any(Array),
      });
    });
  });

  describe("POST /api/v1/users", () => {
    it("should create a new user", async () => {
      const newUserSeeds = createRandomUser();
      const response = await autherdTestAgent.post("/api/v1/users").send({
        name: newUserSeeds.name,
        email: newUserSeeds.email,
        password: newUserSeeds.password,
        role: newUserSeeds.role,
      });

      expect(response.statusCode).toBe(201);
      expect(response.body).toEqual({
        message: "success",
        data: expect.any(Object),
      });

      const userRepository = new UserRepository();
      const createdUser = userRepository.findByEmail(newUserSeeds.email);
      console.log(createdUser, "created user :");
      expect(createdUser).toBeDefined();
    });
  });
});
