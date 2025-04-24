import express from "express";
import {
  createBookController,
  deleteBookController,
  getAllBooksController,
  getBookByIdController,
  updateBookController
} from "./books.controller.js";
import { upload } from "../middleware/fileUpload.js";

import isAuthenticated from "../middleware/jwtAuthentication.js";

const BooksRouter = express.Router();

BooksRouter.post(
  "/createBook",
  upload.single("image"),
  isAuthenticated,
  createBookController
);
BooksRouter.get("/getAllBooks", getAllBooksController);
BooksRouter.get("/getBookByID/:id", getBookByIdController);
BooksRouter.put(
  "/updateBookByID/:id",
  upload.single("image"),
  isAuthenticated,
  updateBookController
);
BooksRouter.delete(
  "/deleteBookByID/:id",
  isAuthenticated,
  deleteBookController
);

export default BooksRouter;
