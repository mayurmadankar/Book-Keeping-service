import express from "express";
import {
  borrowBookController,
  returnBookController
} from "./borrow.controller.js";
import isAuthenticated from "../middleware/jwtAuthentication.js";
import { upload } from "../middleware/fileUpload.js";

const borrowBookRouter = express.Router();

borrowBookRouter.post(
  "/borrowBook",
  upload.none(),
  isAuthenticated,
  borrowBookController
);
borrowBookRouter.put(
  "/returnBook/:bookId",
  upload.none(),
  isAuthenticated,
  returnBookController
);

export default borrowBookRouter;
