import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {});
    console.log(`Connected to Database ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error connection to mongoDB${error.messsage}`);
    process.exit(1);
  }
};
