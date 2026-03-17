import express, { Express } from "express";
import routes from "./routes";
import { errorHandler } from "./middleware/error.middleware";

const app: Express = express();

app.use(express.json());

app.use("/api", routes);
app.use(errorHandler);

export default app;
