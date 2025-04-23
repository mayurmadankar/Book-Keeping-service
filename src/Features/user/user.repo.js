import ApplicationError from "../middleware/applicationError.js";
import { UserModel } from "./user.schema.js";
import mongoose from "mongoose";

export const registerUser = async (name, email, password, gender, role) => {
  try {
    const newUser = UserModel({
      name,
      email,
      password,
      gender,
      role
    });
    const result = await newUser.save();
    return result;
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      throw err;
    } else {
      console.log(err);
      throw new ApplicationError("Something went wrong with database", 500);
    }
  }
};

export const findByEmail = async (email) => {
  try {
    return await UserModel.findOne({ email });
  } catch (err) {
    console.log(err);
    throw new ApplicationError("Error while checking email in database", 500);
  }
};

export const loginUser = async (email, password) => {
  try {
    return await UserModel.findOne({ email, password });
  } catch (err) {
    console.log(err);
    throw new ApplicationError("Error while signIn", 500);
  }
};
