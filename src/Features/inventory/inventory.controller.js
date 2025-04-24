import {
  addBookToLibrary,
  getLibraryInventory,
  removeBookFromLibrary
} from "./inventory.repo.js";

const isAdmin = (user) => user?.role === "admin";

export const getInventory = async (req, res, next) => {
  try {
    if (!isAdmin(req.user)) {
      return res
        .status(403)
        .json({ success: false, message: "Access denied. Admins only." });
    }
    const libraryId = req.params.id;
    if (!libraryId) {
      return res
        .status(400)
        .json({ success: false, message: "Library ID is required." });
    }

    const books = await getLibraryInventory(libraryId);
    res.status(200).json({ success: true, data: books });
  } catch (err) {
    next(err);
  }
};

export const addInventoryBook = async (req, res, next) => {
  try {
    if (!isAdmin(req.user)) {
      return res
        .status(403)
        .json({ success: false, message: "Access denied. Admins only." });
    }
    const libraryId = req.params.id;
    const { title, author } = req.body;

    if (!libraryId) {
      return res
        .status(400)
        .json({ success: false, message: "Library ID is required." });
    }

    if (!title || !author) {
      return res
        .status(400)
        .json({ success: false, message: "Title and Author are required." });
    }
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;
    if (!imageUrl) {
      return res
        .status(400)
        .json({ success: false, message: "Book image is required." });
    }
    const newBook = await addBookToLibrary(libraryId, {
      title,
      author,
      image: imageUrl
    });

    res.status(201).json({
      success: true,
      message: "Book added.",
      data: newBook
    });
  } catch (err) {
    next(err);
  }
};

export const removeInventoryBook = async (req, res, next) => {
  try {
    if (!isAdmin(req.user)) {
      return res
        .status(403)
        .json({ success: false, message: "Access denied. Admins only." });
    }
    const { id: libraryId, bookId } = req.params;

    if (!libraryId || !bookId) {
      return res.status(400).json({
        success: false,
        message: "Library ID and Book ID are required."
      });
    }
    const deleted = await removeBookFromLibrary(libraryId, bookId);
    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Book not found in this library."
      });
    }
    res
      .status(200)
      .json({ success: true, message: "Book removed.", data: deleted });
  } catch (err) {
    next(err);
  }
};
