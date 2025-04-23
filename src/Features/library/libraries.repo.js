import { LibraryModel } from "./libraries.schema.js";
// import { BookModel } from "../models/book.model.js";
import ApplicationError from "../middleware/applicationError.js";
import mongoose from "mongoose";

export const createLibrary = async (name, address) => {
  try {
    const newLibrary = new LibraryModel({ name, address });
    const result = await newLibrary.save();
    return result;
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      throw new ApplicationError("Validation failed: " + err.message, 400);
    } else if (err.code === 11000) {
      throw new ApplicationError(
        "Library already exists with provided details",
        409
      );
    } else {
      throw new ApplicationError(
        "Something went wrong while creating library",
        500
      );
    }
  }
};

export const getAllLibraries = async () => {
  return await LibraryModel.find();
};

export const getLibraryById = async (id) => {
  try {
    const library = await LibraryModel.findById(id);
    if (!library) {
      throw new ApplicationError("Library not found", 404);
    }

    // const books = await BookModel.find({ library: id })
    //   .populate("borrower", "name email")
    //   .populate("author", "name email");

    // return { library, books };
    return library;
  } catch (err) {
    if (err instanceof mongoose.Error.CastError) {
      throw new ApplicationError("Invalid library ID format", 400);
    }
    throw err;
  }
};

export const updateLibrary = async (id, data) => {
  try {
    const updated = await LibraryModel.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true
    });

    if (!updated) {
      throw new ApplicationError("Library not found", 404);
    }

    return updated;
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      throw new ApplicationError("Validation failed: " + err.message, 400);
    } else {
      throw new ApplicationError(
        "Something went wrong while updating library",
        500
      );
    }
  }
};
export const deleteLibrary = async (id) => {
  try {
    const deleted = await LibraryModel.findByIdAndDelete(id);
    if (!deleted) {
      throw new ApplicationError("Library not found", 404);
    }
    return deleted;
  } catch (err) {
    throw new ApplicationError(
      "Error occurred while deleting the library",
      500
    );
  }
};
