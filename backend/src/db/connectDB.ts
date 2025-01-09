// mongopassword = 5HQ6Q6TRvfLlPk3W
// mongousername = abinashnathpandey

import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log("mongoDB connected.");
  } catch (error) {
    console.log(error);
  }
};
export default connectDB;