import { BookModel } from "../Books/books.schema.js";

export const getLibraryInventory = async (libraryId) => {
  return await BookModel.find({ library: libraryId });
};

export const addBookToLibrary = async (libraryId, bookData) => {
  const book = new BookModel({ ...bookData, library: libraryId });
  return await book.save();
};

export const removeBookFromLibrary = async (libraryId, bookId) => {
  return await BookModel.findOneAndDelete({ _id: bookId, library: libraryId });
};
