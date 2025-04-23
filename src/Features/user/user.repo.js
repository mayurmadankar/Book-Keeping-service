import ApplicationError from "../middleware/applicationError.js";
import { UserModel } from "./user.schema.js";

export const signUp = async (name, emailId, password, gender, avatar) => {
  try {
    const newUser = UserModel({
      name,
      emailId,
      password,
      gender
    });
    const result = await newUser.save();
    return result;
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      throw err;
    } else {
      throw new ApplicationError("Something went wrong with database", 500);
    }
  }
};

export const findByEmail = async (emailId) => {
  try {
    return await UserModel.findOne({ emailId });
  } catch (err) {
    console.log(err);
    throw new ApplicationError("Error while checking email in database", 500);
  }
};
