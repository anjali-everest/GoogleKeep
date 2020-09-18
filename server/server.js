import express from "express";
import {
  getAllNotes,
  getOneNote,
  addNote,
  updateNote,
  deleteNote,
} from "./api/controller/noteController";
import NoteService from "./api/service/NoteService";
import cors from "cors";
import {
  addNoteValidation,
  getNoteValidationRules,
  updateNoteValidationRules,
  validate,
  deleteNoteValidationRules,
} from "./api/validation/validator";

const app = express();
app.use(express.json());
app.use(cors());

const noteService = new NoteService();
app.get("/notes", getAllNotes);
app.get("/notes/:id", getNoteValidationRules(), validate, getOneNote);
app.post("/notes", addNoteValidation(), validate, addNote);
app.put("/notes/:id", updateNoteValidationRules(), validate, updateNote);
app.delete("/notes/:id", deleteNoteValidationRules(), validate, deleteNote);

app.listen(8080);

export default app;
