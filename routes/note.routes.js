import express from "express";
import {
  CreateNote,
  DeleteNotes,
  FetchNotes,
  UpdateNote,
} from "../controllers/note.controllers.js";
import { VerificationToken } from "../middlewares/VerificationToken.js";

const NoteRouter = express.Router();

NoteRouter.post("/create", VerificationToken, CreateNote);
NoteRouter.put("/update/:id", VerificationToken, UpdateNote);
NoteRouter.delete("/delete/:id", VerificationToken, DeleteNotes);

NoteRouter.get("/fetch", VerificationToken, FetchNotes);

export default NoteRouter;
