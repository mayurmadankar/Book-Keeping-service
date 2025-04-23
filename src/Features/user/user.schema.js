import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxLength: [25, "Name can't be greater than 25 charcaters"]
  },
  emailId: {
    type: String,
    required: true,
    unique: true,
    match: [/.+\@.+\../, "Please enter a valid email"]
  },
  password: {
    type: String,
    required: true
  },
  gender: {
    type: String
  }
});

export const UserModel = mongoose.model("User", userSchema);
