import mongoose from "mongoose";

const librarySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Library name is required"]
    },
    address: {
      type: String,
      required: [true, "Library address is required"]
    }
  },
  { timestamps: true }
);

export const LibraryModel = mongoose.model("Library", librarySchema);
