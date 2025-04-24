import { BookModel } from "../Books/books.schema.js";
import { BorrowModel } from "./borrow.schema.js";
import mongoose from "mongoose";

export const borrowBookController = async (req, res, next) => {
  try {
    const { bookId, charge } = req.body;
    const userId = req.user._id;
    const userRole = req.user.role;

    if (!bookId || charge == null) {
      return res
        .status(400)
        .json({ success: false, message: "Book ID and charge are required." });
    }
    if (userRole !== "borrower") {
      return res
        .status(403)
        .json({ success: false, message: "Only borrowers can borrow books." });
    }
    const book = await BookModel.findById(bookId);
    if (!book) {
      return res
        .status(404)
        .json({ success: false, message: "Book not found." });
    }

    const alreadyBorrowed = await BorrowModel.findOne({
      user: userId,
      "books.book": bookId,
      "books.returned": false
    });

    if (alreadyBorrowed) {
      return res.status(400).json({
        success: false,
        message: "You have already borrowed this book."
      });
    }
    const borrowRecord = await BorrowModel.findOneAndUpdate(
      { user: userId },
      {
        $push: {
          books: { book: bookId, charge, returned: false }
        }
      },
      { upsert: true, new: true }
    );
    await BookModel.findByIdAndUpdate(bookId, {
      $push: {
        borrowHistory: {
          user: userId,
          charge: charge,
          returned: false
        }
      }
    });

    res.status(200).json({
      success: true,
      message: "Book borrowed successfully.",
      data: borrowRecord
    });
  } catch (err) {
    next(err);
  }
};
export const returnBookController = async (req, res, next) => {
  try {
    const { bookId } = req.body;
    const userId = req.user._id;
    // console.log(userId)
    // console.log("Returning Book ID:", bookId);

    if (!mongoose.Types.ObjectId.isValid(bookId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid book ID." });
    }

    const updatedBorrow = await BorrowModel.findOneAndUpdate(
      {
        user: userId,
        "books.book": bookId,
        "books.returned": false
      },
      {
        $set: {
          "books.$.returned": true
        }
      },
      { new: true }
    );
    await BookModel.updateOne(
      {
        _id: bookId,
        "borrowHistory.user": userId,
        "borrowHistory.returned": false
      },
      {
        $set: {
          "borrowHistory.$.returned": true
        }
      }
    );

    if (!updatedBorrow) {
      return res
        .status(404)
        .json({ success: false, message: "No borrowed book record found." });
    }

    res.status(200).json({
      success: true,
      message: "Book returned successfully.",
      data: updatedBorrow
    });
  } catch (err) {
    next(err);
  }
};
