import { BookModel } from "../Books/books.schema.js";

export const borrowBookController = async (req, res, next) => {
  try {
    const { bookId, charge } = req.body;
    const userId = req.user.id;
    const userRole = req.user.role;

    if (!bookId || charge == null) {
      return res.status(400).json({
        success: false,
        message: "Book ID and charge are required."
      });
    }
    if (userRole !== "borrower") {
      return res.status(403).json({
        success: false,
        message: "Only users with 'borrower' role can borrow books."
      });
    }
    const book = await BookModel.findById(bookId);
    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found."
      });
    }
    if (book.borrower) {
      return res.status(400).json({
        success: false,
        message: "Book is already borrowed."
      });
    }
    const updatedBook = await BookModel.findByIdAndUpdate(
      bookId,
      { borrower: userId, charge },
      { new: true, runValidators: true }
    );
    res.status(200).json({
      success: true,
      message: "Book borrowed successfully",
      data: updatedBook
    });
  } catch (err) {
    next(err);
  }
};

export const returnBookController = async (req, res, next) => {
  try {
    const bookId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(bookId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid book ID format."
      });
    }
    const updatedBook = await BookModel.findByIdAndUpdate(
      bookId,
      { $unset: { borrower: "", charge: "" } },
      { new: true }
    );
    if (!updatedBook) {
      return res.status(404).json({
        success: false,
        message: "Book not found."
      });
    }
    res.status(200).json({
      success: true,
      message: "Book returned successfully",
      data: updatedBook
    });
  } catch (err) {
    next(err);
  }
};
