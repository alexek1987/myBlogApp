import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import blogRoutes from "./routes/blogRoutes.js";
import mongoose from "mongoose";

// Init the app

const app = express();

// MIDDLE WARE

dotenv.config();

// Enables http reqs

app.use(cors({ origin: "http://localhost:3000" }));

// Body parser, enables data from front end to be parsed

app.use(express.json({ limit: "5mb" }));

// configure db:
// for "atlas" edit CONNECTION_URL in -> .env file || for "community server" edit <dbname>
const CONNECTION_URL =
  process.env.CONNECTION_URL || "mongodb://localhost:27017/<dbname>";
const DEPRECATED_FIX = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
};

// connect to db
mongoose
  .connect(CONNECTION_URL, DEPRECATED_FIX)
  .catch((error) => console.log("❌ MongoDB connection error", error)); // listen for errors on initial connection

const db = mongoose.connection;
db.on("connected", () => console.log("✅ MongoDB connected")); // connected
db.on("disconnected", () => console.log("❌ MongoDB disconnected")); // disconnected
db.on("error", (error) => console.log("❌ MongoDB connection error", error)); // listen for errors during the session

// ROUTES

app.get("/", (req, res, next) =>
  res.status(200).json({ message: "Welcome to the blog" })
);

app.use("/", blogRoutes);

// SERVER STARTS LISTENING
const PORT = process.env.PORT || 8081;

app.listen(PORT, () => console.log(`App is listening to ${PORT}`));
