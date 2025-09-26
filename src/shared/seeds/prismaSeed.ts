import { faker } from "@faker-js/faker";
import { PrismaClient } from "../../generated/prisma";

const prisma = new PrismaClient();

async function main() {
  // 1. Clear existing data (order matters if you have relations!)
  await prisma.user.deleteMany();
  await prisma.course.deleteMany();

  // 2. Recreate fresh courses
  const courses = [];
  for (let i = 0; i < 5; i++) {
    const course = await prisma.course.create({
      data: {
        title: faker.string.alpha({ length: { min: 3, max: 100 } }),
        description: faker.string.alphanumeric({
          length: { min: 10, max: 200 },
        }),
        image: faker.image.url(),
      },
    });
    courses.push(course);
  }

  // 3. Recreate fresh users and connect them to courses
  for (let i = 0; i < 10; i++) {
    await prisma.user.create({
      data: {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        role: "STUDENT",
        courses: {
          connect: [
            { id: courses[Math.floor(Math.random() * courses.length)]!.id },
          ],
        },
      },
    });
  }

  console.log("✅ Database reset and seeded successfully!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("❌ Error seeding database:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
