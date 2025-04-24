import express from "express";
import { createBookController } from "./books.controller.js";
import { upload } from "../middleware/fileUpload.js";

import isAuthenticated from "../middleware/jwtAuthentication.js";

const BooksRouter = express.Router();

// BooksRouter.get("/books", getAllBooksController);
// BooksRouter.get("/books/:id", getBookByIdController);
BooksRouter.post(
  "/createBook",
  upload.single("image"),
  isAuthenticated,
  createBookController
);
// BooksRouter.put("/books/:id", updateBookController);
// BooksRouter.delete("/books/:id", deleteBookController);

export default BooksRouter;
