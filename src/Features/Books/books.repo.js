import { BookModel } from "./books.schema.js";
import ApplicationError from "../middleware/applicationError.js";

export const createBook = async (data) => {
  try {
    const book = new BookModel(data);
    return await book.save();
  } catch (err) {
    throw new ApplicationError("Failed to create book", 500);
  }
};
export const getAllBooks = async () => {
  try {
    return await BookModel.find()
      .populate("library", "name address")
      .populate("author", "name email")
      .populate("borrower", "name email");
  } catch (err) {
    throw new ApplicationError("Failed to fetch books", 500);
  }
};

export const getBookById = async (id) => {
  try {
    const book = await BookModel.findById(id)
      .populate("library", "name address")
      .populate("author", "name email")
      .populate("borrower", "name email");
    if (!book) throw new ApplicationError("Book not found", 404);
    return book;
  } catch (err) {
    throw new ApplicationError("Error retrieving book", 500);
  }
};

export const updateBook = async (id, data) => {
  try {
    const updated = await BookModel.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true
    });
    if (!updated) throw new ApplicationError("Book not found", 404);
    return updated;
  } catch (err) {
    throw new ApplicationError("Failed to update book", 500);
  }
};

export const deleteBook = async (id) => {
  try {
    const deleted = await BookModel.findByIdAndDelete(id);
    if (!deleted) throw new ApplicationError("Book not found", 404);
    return deleted;
  } catch (err) {
    throw new ApplicationError("Failed to delete book", 500);
  }
};
