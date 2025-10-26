import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import propertyRoutes from "./routes/propertyRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "✅ Server is healthy!" });
});

// Routes
app.use("/api/properties", propertyRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Backend running on http://localhost:${PORT}`);
});
