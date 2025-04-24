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
    borrowHistory: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true
        },
        charge: {
          type: Number,
          min: 0,
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
    ],
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
