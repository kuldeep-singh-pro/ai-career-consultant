import express from "express";
import aiRoutes from "./routes/ai.routes";

const app = express();

app.use(express.json());

app.use("/api/ai", aiRoutes);

export default app;