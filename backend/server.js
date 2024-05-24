import express from "express";
import dotevn from "dotenv";
import cookieParser from "cookie-parser";
import { connectDB } from "./db/connectDB.js";
import authRoute from "./routes/auth.route.js";

dotevn.config();
const app = express();

const PORT = process.env.PORT;

// middleware
app.use(express.json()); // to parse req.body
app.use(express.urlencoded({ extended: true })); // to parse the form data(urlencoded)
app.use(cookieParser()); // to parse the cookie

app.use("/api/auth", authRoute);

app.listen(PORT, () => {
  console.log("Server is running!", PORT);
  connectDB();
});
