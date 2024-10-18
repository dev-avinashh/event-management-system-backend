import express from "express";
import cors from "cors";
// import helmet from "helmet";
import dotenv from "dotenv";
import { connectDatabase } from "./config/db.config.js";
import router from "./routes/routes.js";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;
const ENV = process.env.NODE_ENV || "development";

app.use(express.json()); 


app.use('/api/events', router);
app.use(cors({ origin: ENV === "production" ? process.env.ALLOWED_ORIGINS : "*" }));


connectDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
  });

// Graceful shutdown
process.on("SIGTERM", () => {
  console.log("SIGTERM received. Shutting down gracefully...");
  app.close(() => {
    console.log("Server closed");
    process.exit(0);
  });
});
