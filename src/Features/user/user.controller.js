import { findByEmail } from "./user.repo.js";

export const signUp = async (req, res, next) => {
  try {
    const { name, emailId, password, gender } = req.body;

    const hashPassword = await bcrypt.hash(password, 12);

    const existingUser = await findByEmail(emailId);
    if (existingUser) {
      return res.status(400).send("User already registered.");
    }
    const userCreated = await this.userRepository.signUp(
      name,
      emailId,
      hashPassword,
      gender
    );
    if (userCreated._id) {
      res.status(201).send({
        success: true,
        message: "User has been registered successfully!",
        data: userCreated
      });
    } else {
      res.status(400).send({
        success: false,
        message: "User has not been registered!",
        data: []
      });
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
};
