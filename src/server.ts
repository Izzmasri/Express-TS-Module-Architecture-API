import "dotenv/config";
import app from "./app";
import { UserService } from "./users/users.service";
import { createArgonHash } from "./auth/util/argon.util";

const PORT = process.env.PORT || 4000;

async function start() {
  const userService = new UserService();
  const adminEmail = "admin@no.com";

  const exists = userService
    .getUsers()
    .find((u) => u.email.toLowerCase() === adminEmail);

  if (!exists) {
    const hashed = await createArgonHash("admin123");
    userService.createUser("Admin", adminEmail, hashed, "ADMIN");
    console.log("✅ Seeded default admin:", adminEmail, "/ admin123");
  }

  app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
  });
}

start();
