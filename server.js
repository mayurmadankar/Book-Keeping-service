import express from "express";
import dotenv from "dotenv";
dotenv.config();

import bodyParser from "body-parser";
import { connectDB } from "./src/config/db.js";
import userRouter from "./src/Features/user/user.route.js";

const server = express();
const PORT = process.env.PORT;

server.use(bodyParser.json());
server.use(express.json());
server.use(bodyParser.urlencoded({ extended: true }));

server.get("/", (req, res) => {
  res.send("Welcome to the Book Keeping service");
});

server.use("/api/user", userRouter);

server.listen(PORT, () => {
  console.log(`Server is listening at PORT : ${PORT}`);
  connectDB();
});
