import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import serviceRoutes from "./routes/serviceRoutes.js";
import enquiryRoutes from "./routes/enquiryRoutes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:5173" }));
app.use(express.json());

app.get("/", (_req, res) => res.send("Mobile Service & Product Sales API running"));
app.get("/favicon.ico", (_req, res) => res.status(204).end());

const requireDB = async (_req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    res.status(500).json({ message: error.message || "Database connection failed" });
  }
};

app.use("/api/auth", requireDB, authRoutes);
app.use("/api/products", requireDB, productRoutes);
app.use("/api/orders", requireDB, orderRoutes);
app.use("/api/services", requireDB, serviceRoutes);
app.use("/api/enquiries", requireDB, enquiryRoutes);

app.use((err, _req, res, _next) => {
  res.status(500).json({ message: err.message || "Server error" });
});

if (process.env.VERCEL !== "1") {
  app.listen(port, () => console.log(`Server running on port ${port}`));
}

export default app;
