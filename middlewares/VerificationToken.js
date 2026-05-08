import jwt from "jsonwebtoken";
import UserModal from "../modals/Auth.modals.js";

export const VerificationToken = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(403).json({ message: "Unauthorized, please Login" });
    }

    const decoded = await jwt.decode(token, process.env.JWT_SECRET_KEY);
    const user = await UserModal.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({ message: "User not Found" });
    }
    req.userId = user._id;

    next();
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
