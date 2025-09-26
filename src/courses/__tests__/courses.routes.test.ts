// import {
//   autherdTestAgentWithRole,
//   unAuthedTestAgent,
// } from "../../shared/tests/helper/supertest.helper";
// import { courseData } from "../courses.data";

// describe("courses routes endpoint", () => {
//   describe("GET /api/v1/courses/:id", () => {
//     it("should return course details when ID is valid", async () => {
//       const response = await unAuthedTestAgent.get(
//         `/api/v1/courses/${courseData[0]!.id}`
//       );
//       expect(response.status).toBe(200);
//     });

//     it("should return 404 for invalid course ID", async () => {
//       const invalidId = Math.random().toString(36).substring(2, 7);
//       const response = await unAuthedTestAgent.get(
//         `/api/v1/courses/${invalidId}`
//       );
//       expect(response.statusCode).toBe(404);
//       expect(response.body).toEqual({
//         error: "Course not found",
//       });
//     });
//   });
//   describe("GET /api/v1/courses", () => {
//     it("should return a list of all courses (public)", async () => {
//       const response = await unAuthedTestAgent.get("/api/v1/courses");
//       expect(response.status).toBe(200);
//     });

//     it("should return an empty array when no courses exist", async () => {
//       courseData.length = 0;
//       const response = await unAuthedTestAgent.get("/api/v1/courses");
//       expect(response.statusCode).toBe(200);
//       expect(response.body).toEqual({
//         message: "success",
//         results: 0,
//         data: [],
//       });
//     });
//   });

//   describe("POST /api/v1/courses", () => {
//     it("should create a course for COACH", async () => {
//       const coachAgent = autherdTestAgentWithRole("COACH");
//       const response = await coachAgent.post("/api/v1/courses").send({
//         title: "New Course",
//         description: "This is a great course",
//       });

//       expect(response.statusCode).toBe(201);
//       expect(response.body.message).toBe("success");
//     });

//     it("should return 403 for STUDENT", async () => {
//       const studentAgent = autherdTestAgentWithRole("STUDENT");
//       const response = await studentAgent.post("/api/v1/courses").send({
//         title: "Forbidden course",
//         description: "This should not be allowed",
//       });

//       expect(response.statusCode).toBe(403);
//     });

//     it("should return 400 for missing fields", async () => {
//       const coachAgent = autherdTestAgentWithRole("COACH");
//       const response = await coachAgent.post("/api/v1/courses").send({});
//       expect(response.statusCode).toBe(400);
//     });
//   });
// });

// ------------------------

// testing with prisma and DB

import {
  autherdTestAgentWithRole,
  unAuthedTestAgent,
} from "../../shared/tests/helper/supertest.helper";
import { PrismaClient } from "../../generated/prisma";

const prisma = new PrismaClient();

describe("courses routes endpoint", () => {
  let courseId: string;

  beforeAll(async () => {
    // Insert only one test course (don't wipe existing data)
    const course = await prisma.course.create({
      data: {
        title: "Seed Course",
        description: "Seed description",
      },
    });
    courseId = course.id;
  });

  afterAll(async () => {
    // Delete only the test course created
    await prisma.course.delete({
      where: { id: courseId },
    });
    await prisma.$disconnect();
  });

  describe("GET /api/v1/courses/:id", () => {
    it("should return course details when ID is valid", async () => {
      const response = await unAuthedTestAgent.get(
        `/api/v1/courses/${courseId}`
      );
      expect(response.status).toBe(200);
      expect(response.body.data).toMatchObject({
        id: courseId,
        title: "Seed Course",
      });
    });

    it("should return 404 for invalid course ID", async () => {
      const response = await unAuthedTestAgent.get(
        `/api/v1/courses/invalid-id`
      );
      expect(response.statusCode).toBe(404);
      expect(response.body).toEqual({
        error: "Course not found",
      });
    });
  });

  describe("GET /api/v1/courses", () => {
    it("should return a list of all courses (public)", async () => {
      const response = await unAuthedTestAgent.get("/api/v1/courses");
      expect(response.status).toBe(200);
      expect(response.body.results).toBeGreaterThanOrEqual(1);
    });
  });

  describe("POST /api/v1/courses", () => {
    it("should create a course for COACH", async () => {
      const coachAgent = autherdTestAgentWithRole("COACH");
      const response = await coachAgent.post("/api/v1/courses").send({
        title: "New Course",
        description: "This is a great course",
      });

      expect(response.statusCode).toBe(201);
      expect(response.body.message).toBe("success");
      expect(response.body.data).toHaveProperty("id");

      // cleanup this test course immediately
      await prisma.course.delete({
        where: { id: response.body.data.id },
      });
    });

    it("should return 403 for STUDENT", async () => {
      const studentAgent = autherdTestAgentWithRole("STUDENT");
      const response = await studentAgent.post("/api/v1/courses").send({
        title: "Forbidden course",
        description: "This should not be allowed",
      });

      expect(response.statusCode).toBe(403);
    });

    it("should return 400 for missing fields", async () => {
      const coachAgent = autherdTestAgentWithRole("COACH");
      const response = await coachAgent.post("/api/v1/courses").send({});
      expect(response.statusCode).toBe(400);
    });
  });
});
