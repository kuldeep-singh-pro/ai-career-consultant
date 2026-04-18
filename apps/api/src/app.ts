import express, { Express } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";

import routes from "./routes";
import { errorMiddleware } from "./middleware/error.middleware";

const app: Express = express();

app.set("trust proxy", 1);

const allowedOrigins = [
  process.env.FRONTEND_URL, 
  "https://ai-career-consultant.netlify.app",
  "http://localhost:3000",
  "https://69e2669bce485700084e5976-ai-career-consultant.netlify.app"
];

app.use(cors({
  origin: (origin, callback) => {

    if (!origin || allowedOrigins.includes(origin) || origin.endsWith(".netlify.app")) {
      callback(null, true);
    } else {
      console.error(`CORS Blocked: ${origin}`);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(helmet({
  contentSecurityPolicy: false,
}));

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
} else {
  app.use(morgan("combined"));
}

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  message: {
    success: false,
    message: "Too many requests, please try again later."
  }
});


app.use("/api", limiter);

app.use("/api", routes);

app.use("/api/*", (_req, res) => {
  res.status(404).json({
    success: false,
    message: "API Route not found",
  });
});

app.use(errorMiddleware);

export default app;