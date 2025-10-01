import "dotenv/config";
import mongoose from "mongoose";
import { faker } from "@faker-js/faker";
import { UserModel } from "../../users/users.model";
import { CourseModel } from "../../courses/courses.model";

async function seed() {
  try {
    await mongoose.connect(process.env.MongoDB_URL!);
    console.log("✅ Connected to MongoDB");

    // 1. Clear existing data
    await UserModel.deleteMany({});
    await CourseModel.deleteMany({});
    console.log("🧹 Cleared old data");

    // 2. Create admins
    const admin = await UserModel.create({
      name: faker.person.fullName(),
      email: "admin@no.com",
      password: "admin123",
      role: "ADMIN",
    });

    // 3. Create coaches
    const coaches = [];
    for (let i = 0; i < 2; i++) {
      const coach = await UserModel.create({
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        role: "COACH",
      });
      coaches.push(coach);
    }

    // 4. Create students
    const students = [];
    for (let i = 0; i < 5; i++) {
      const student = await UserModel.create({
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        role: "STUDENT",
      });
      students.push(student);
    }

    console.log("👤 Users created");

    // 5. Create courses with random coach + students
    const courses = [];
    for (let i = 0; i < 5; i++) {
      const randomCoach = coaches[Math.floor(Math.random() * coaches.length)];
      const selectedStudents = faker.helpers.arrayElements(
        students,
        faker.number.int({ min: 1, max: students.length })
      );

      const course = await CourseModel.create({
        title: faker.lorem.words({ min: 3, max: 6 }),
        description: faker.lorem.sentences({ min: 2, max: 5 }),
        image: faker.image.urlLoremFlickr({ category: "education" }),
        coach: randomCoach?._id,
        students: selectedStudents.map((s) => s._id),
      });

      courses.push(course);
    }

    console.log(`📘 ${courses.length} Courses created with coach and students`);
    console.log("✅ Seeding done!");
  } catch (err) {
    console.error("❌ Error seeding data:", err);
  } finally {
    await mongoose.disconnect();
    console.log("🔌 Disconnected from MongoDB");
  }
}

seed();
