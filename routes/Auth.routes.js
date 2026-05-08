import express from "express";
import { Login, Logout, Register } from "../controllers/Auth.controllers.js";

const AuthRouter = express.Router();

AuthRouter.post("/register", Register);
AuthRouter.post("/login", Login);
AuthRouter.get("/logout", Logout);

export default AuthRouter;
