import express from "express";
import {
  addInventoryBook,
  getInventory,
  removeInventoryBook
} from "./inventory.controller.js";
import { upload } from "../middleware/fileUpload.js";
import isAuthenticated from "../middleware/jwtAuthentication.js";

const inventoryRouter = express.Router();

inventoryRouter.post(
  "/addInventory/:id/inventory",
  upload.single("image"),
  isAuthenticated,
  addInventoryBook
);
inventoryRouter.get(
  "/getAllInventory/:id/inventory",
  isAuthenticated,
  getInventory
);
inventoryRouter.delete(
  "/deleteInventory/:id/inventory/:bookId",
  isAuthenticated,
  removeInventoryBook
);

export default inventoryRouter;
