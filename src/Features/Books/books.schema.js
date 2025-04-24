import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    author: {
      type: String,
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
    image: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

export const BookModel = mongoose.model("Book", bookSchema);
