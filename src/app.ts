import express from "express";
import path from "path";
import { userRouter } from "./users/users.routes";
import { courseRouter } from "./courses/courses.routes";
import { authRouter } from "./auth/auth.routes";
const app = express();

import { HttpErrorStatus } from "./shared/utils/util.types";
import { handleError } from "./shared/utils/exception";

app.use(express.json());
app.use(express.urlencoded());

app.use(
  "/api/v1/uploads",
  express.static(path.join(__dirname, "./shared/uploads"))
);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/courses", courseRouter);

app.use((req, res) => {
  res.status(HttpErrorStatus.NotFound).json({ message: "Route not found" });
});

app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    _next: express.NextFunction
  ) => {
    handleError(err, res);
  }
);

export default app;
