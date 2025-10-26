import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import propertyRoutes from "./routes/propertyRoutes";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check route
app.get("/health", (req, res) => {
  res.json({
    ok: true,
    service: "backend",
    uptime: process.uptime(),
  });
});

// Register property routes
app.use("/api/properties", propertyRoutes);

// Start the server
app.listen(port, () => {
  console.log(`🚀 Backend running on http://localhost:${port}`);
});
