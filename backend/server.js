import express from "express";
import dotevn from "dotenv";
import { connectDB } from "./db/connectDB.js";
import authRoute from "./routes/auth.route.js";

dotevn.config();
const app = express();

const PORT = process.env.PORT;
app.use("/api/auth", authRoute);

app.listen(PORT, () => {
  console.log("Server is running!");
  connectDB();
});
