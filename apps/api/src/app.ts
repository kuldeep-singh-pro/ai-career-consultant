import express, { Express } from "express";
import routes from "./routes";
import { ApiError } from "./utils/apiError";

const app: Express = express();

app.use(express.json());

app.use("/api", routes);

app.use((err: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  return res.status(500).json({
    success: false,
    message: "Internal server error",
  });
});

export default app;
