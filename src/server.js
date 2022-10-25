import express from "express";
import path from "path";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from "cors";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
// import routes here
import postRoutes from "./routes/post.routes.js";
import userRoutes from "./routes/user.routes.js";

dotenv.config();
connectDB();
const app = express();
app.use(express.json());
app.use(cors());

// app.use routes
app.use("/api/posts", postRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("API is running");
});

// error middleware here
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
