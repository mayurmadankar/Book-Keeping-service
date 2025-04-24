import mongoose from "mongoose";

const borrowSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    books: [
      {
        book: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Book",
          required: true
        },
        charge: {
          type: Number,
          required: true
        },
        borrowedAt: {
          type: Date,
          default: Date.now
        },
        returned: {
          type: Boolean,
          default: false
        }
      }
    ]
  },
  {
    timestamps: true
  }
);

export const BorrowModel = mongoose.model("Borrow", borrowSchema);
