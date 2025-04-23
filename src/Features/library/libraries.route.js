// src/routes/library.routes.js
import express from "express";
import {
  createLibraryController,
  deleteLibraryController,
  getAllLibrariesController,
  getLibraryByIdController,
  updateLibraryController
} from "./libraries.controller.js";

import isAuthenticated from "../middleware/jwtAuthentication.js";

const librariesRouter = express.Router();

librariesRouter.post(
  "/createLibrary",
  isAuthenticated,
  createLibraryController
);
librariesRouter.get(
  "/getAllLibraries",
  isAuthenticated,
  getAllLibrariesController
);
librariesRouter.get(
  "/getLibraryByID/:id",
  isAuthenticated,
  getLibraryByIdController
);
librariesRouter.put(
  "/updateLibraryByID/:id",
  isAuthenticated,
  updateLibraryController
);
librariesRouter.delete(
  "/deleteLibraryByID/:id",
  isAuthenticated,
  deleteLibraryController
);

export default librariesRouter;
