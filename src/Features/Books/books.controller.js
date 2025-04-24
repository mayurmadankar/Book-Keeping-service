import { createBook } from "./books.repo.js";

export const createBookController = async (req, res, next) => {
  try {
    const { title, library, author, borrower } = req.body;

    if (!title?.trim() || !library?.trim() || !author?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Title, library, and author are required."
      });
    }
    let imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const result = await createBook({
      ...req.body,
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
    const result = await updateBook(req.params.id, req.body);
    res
      .status(200)
      .json({ success: true, message: "Book updated", data: result });
  } catch (err) {
    next(err);
  }
};

export const deleteBookController = async (req, res, next) => {
  try {
    const result = await deleteBook(req.params.id);
    res
      .status(200)
      .json({ success: true, message: "Book deleted", data: result });
  } catch (err) {
    next(err);
  }
};
