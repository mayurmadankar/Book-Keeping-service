import {
  createBook,
  deleteBook,
  getAllBooks,
  getBookById,
  updateBook
} from "./books.repo.js";
import mongoose from "mongoose";

export const createBookController = async (req, res, next) => {
  try {
    const { title, library, author, borrower, charge } = req.body;

    if (!title?.trim() || !library?.trim() || !author?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Title, library, and author are required."
      });
    }
    if (charge && isNaN(Number(charge))) {
      return res.status(400).json({
        success: false,
        message: "Charge must be a number."
      });
    }
    let imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const result = await createBook({
      ...req.body,
      charge: charge ? Number(charge) : 0,
      image: imageUrl
    });
    res.status(201).json({
      success: true,
      message: "Book created successfully",
      data: result
    });
  } catch (err) {
    next(err);
  }
};

export const getAllBooksController = async (req, res, next) => {
  try {
    const result = await getAllBooks();
    res
      .status(200)
      .json({ success: true, message: "Books fetched", data: result });
  } catch (err) {
    next(err);
  }
};

export const getBookByIdController = async (req, res, next) => {
  try {
    const result = await getBookById(req.params.id);
    res
      .status(200)
      .json({ success: true, message: "Book fetched", data: result });
  } catch (err) {
    next(err);
  }
};

export const updateBookController = async (req, res, next) => {
  try {
    const { title, author, borrower, library, charge } = req.body;
    const bookId = req.params.id;

    if (title && typeof title !== "string") {
      return res.status(400).json({
        success: false,
        message: "Title must be a string."
      });
    }

    if (library && !mongoose.Types.ObjectId.isValid(library)) {
      return res.status(400).json({
        success: false,
        message: "Invalid library ID format."
      });
    }

    if (!author) {
      return res.status(400).json({
        success: false,
        message: "Author is required."
      });
    }

    if (charge && isNaN(Number(charge))) {
      return res.status(400).json({
        success: false,
        message: "Charge must be a number."
      });
    }
    let imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    if (!imageUrl) {
      return res.status(400).json({
        success: false,
        message: "Book cover is needed"
      });
    }
    const updateData = {
      ...req.body,
      charge: charge ? Number(charge) : 0,
      image: imageUrl
    };
    const result = await updateBook(bookId, updateData);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Book not found."
      });
    }
    res.status(200).json({
      success: true,
      message: "Book updated successfully",
      data: result
    });
  } catch (err) {
    next(err);
  }
};

export const deleteBookController = async (req, res, next) => {
  try {
    const bookId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(bookId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid book ID format."
      });
    }
    const result = await deleteBook(bookId);

    res.status(200).json({
      success: true,
      message: "Book deleted successfully",
      data: result
    });
  } catch (err) {
    next(err);
  }
};
