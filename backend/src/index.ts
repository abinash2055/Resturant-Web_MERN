import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connectDB";
import userRoute from "./routes/user.route";
import resturantRoute from "./routes/resturant.route";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// default middleware
app.use(bodyParser.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(express.json());
app.use(cookieParser());

const corsOption = {
  origin: "http://localhost:5173",
  credential: true,
};

app.use(cors(corsOption));

// FOR API
app.use("/api/v1/user", userRoute);
app.use("/api/v1/resturant", resturantRoute);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server listen at port ${PORT}`);
});
