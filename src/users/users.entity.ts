export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: "ADMIN" | "COACH" | "STUDENT" | undefined;
  createdAt: Date;
  updatedAt: Date;
}
