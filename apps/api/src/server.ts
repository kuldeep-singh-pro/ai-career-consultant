import app from "./app";
import { connectDB } from "./config/db";

const startServer = async () => {
  try {
    await connectDB();

    const PORT = process.env.PORT || 5000;

    const server = app.listen(PORT, () => {
      console.log(`🚀 Production server running on port ${PORT}`);
    });

 
    server.timeout = 120000;

    process.on("unhandledRejection", (err: Error) => {
      console.error(`Unhandled Rejection: ${err.message}`);
      server.close(() => process.exit(1));
    });

    process.on("SIGTERM", () => {
      console.log("SIGTERM received. Cleaning up...");
      server.close(() => {
        console.log("Process terminated.");
      });
    });

  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();