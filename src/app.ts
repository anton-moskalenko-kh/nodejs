import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import fileUpload from "express-fileupload";
import * as mongoose from "mongoose";
import swaggerUi from "swagger-ui-express";

import swaggerSpec from "../docs/swagger.json";
import { configs } from "./configs/configs";
import { jobRunner } from "./crons";
import { ApiError } from "./errors/api-error";
import { authRouter } from "./routers/auth.router";
import { userRouter } from "./routers/user.router";

const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: [
      "Authorization",
      "Content-Type",
      "Origin",
      "Access-Control-Allow-Origin",
    ],
    preflightContinue: false,
    optionsSuccessStatus: 200,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());
app.use("/users", userRouter);
app.use("/auth", authRouter);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(
  "*",
  (err: ApiError, req: Request, res: Response, next: NextFunction) => {
    res.status(err.status || 500).json(err.message);
  },
);

process.on("uncaughtException", (e) => {
  console.error("uncaughtException", e.message, e.stack);
  process.exit(1);
});

app.listen(configs.APP_PORT, configs.APP_HOST, async () => {
  await mongoose.connect(configs.MONGO_URL);
  console.log(`Server is running on port ${configs.APP_PORT}`);
  jobRunner();
});
