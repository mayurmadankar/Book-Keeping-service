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
borrowBookRouter.put("/returnBook/:id", returnBookController);

export default borrowBookRouter;
