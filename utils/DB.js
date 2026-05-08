import mongoose from "mongoose";

const DBConn = async () => {
  try {
    mongoose.connect(process.env.MONGODB_URL).then(() => {
      console.log("Database Connected Successfull");
    });
  } catch (err) {
    console.log("Database Connection Failed", err);
  }
};

export default DBConn;
