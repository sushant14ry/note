import UserModal from "../modals/Auth.modals.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const Register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All Fields are Requiresd" });
    }

    // Check Found User
    const existingUser = await UserModal.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User Already Register" });
    }

    // Hash Password
    const hashPassword = await bcrypt.hash(password, 10);

    const User = await UserModal.create({
      username,
      email,
      password: hashPassword,
    });
    res
      .status(201)
      .json({ success: true, message: "User Register Successfull", User });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check Found User
    const checkUser = await UserModal.findOne({ email });
    if (!checkUser) {
      return res.status(404).json({
        success: false,
        message: "User Not Found, Please Register First !",
      });
    }

    // Bcrypt Password
    const isMatch = await bcrypt.compare(password, checkUser.password);
    if (!isMatch) {
      return res.status(404).json({ message: "Invalid Credentials" });
    }

    const token = await jwt.sign(
      { userId: checkUser._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "7d" },
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      maxAge: 3 * 24 * 3600 * 1000,
    });

    res.status(201).json({
      success: true,
      message: "User Login Successfull",
      checkUser,
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const Logout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ success: true, message: "User Logout Successfull" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ superess: false, message: "Internal Server Error" });
  }
};

export { Register, Login, Logout };
