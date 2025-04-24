import express from "express";
import dotenv from "dotenv";
dotenv.config();

import bodyParser from "body-parser";
import { connectDB } from "./src/config/db.js";
import userRouter from "./src/Features/user/user.route.js";
import { errorHandlerMiddleware } from "./src/Features/middleware/applicationError.js";
import librariesRouter from "./src/Features/library/libraries.route.js";
import BooksRouter from "./src/Features/Books/books.route.js";
import borrowBookRouter from "./src/Features/borrowBook/borrow.routes.js";

const server = express();
const PORT = process.env.PORT;

server.use(bodyParser.json());
server.use(express.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(errorHandlerMiddleware);

server.get("/", (req, res) => {
  res.send("Welcome to the Book Keeping service");
});

server.use("/api/users", userRouter);
server.use("/api/library", librariesRouter);
server.use("/api/books", BooksRouter);
server.use("/api/borrow", borrowBookRouter);

server.listen(PORT, () => {
  console.log(`Server is listening at PORT : ${PORT}`);
  connectDB();
});
