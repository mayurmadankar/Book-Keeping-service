import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const baseUrl = process.env.MONGODB_URL;
// console.log(baseUrl);

export const connectDB = async () => {
  try {
    await mongoose
      .connect(baseUrl, {
        dbName: "BookKeeping"
      })
      .then((db) => console.log("Mongodb connected : ", db.connection.host))
      .catch((error) =>
        console.error(`Error while connecting to the db ${error.message}`)
      );
  } catch (error) {
    console.log(`Error while connecting to db ${error.message}`);
  }
};
