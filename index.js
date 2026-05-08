import dotenv from "dotenv";
dotenv.config();

import express from "express";
import AuthRouter from "./routes/Auth.routes.js";
import DBConn from "./utils/DB.js";
import NoteRouter from "./routes/note.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
const port = process.env.PORT || 3000;

// Mongodb Connection Here
DBConn();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use("/auth", AuthRouter);
app.use("/note", NoteRouter);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, (req, res) => {
  console.log(`Server is Running on Port : ${port}`);
});
