import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    borrower: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    library: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Library",
      required: true
    },
    publishedYear: {
      type: Number
    },
    genre: {
      type: String
    }
  },
  { timestamps: true }
);

export const BookModel = mongoose.model("Book", bookSchema);
