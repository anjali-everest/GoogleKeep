import express from "express";
import NoteController from "./api/controller/NoteController";
import cors from "cors";
import {
  addNoteValidation,
  getNoteValidationRules,
  updateNoteValidationRules,
  validate,
  deleteNoteValidationRules,
} from "./api/validation/validator";
import NoteService from "./api/service/NoteService";

const app = express();
app.use(express.json());
app.use(cors());

const noteController = new NoteController(new NoteService());
app.get("/notes", noteController.getAllNotes);
app.get(
  "/notes/:id",
  getNoteValidationRules(),
  validate,
  noteController.getOneNote
);
app.post("/notes", addNoteValidation(), validate, noteController.addNote);
app.put(
  "/notes/:id",
  updateNoteValidationRules(),
  validate,
  noteController.updateNote
);
app.delete(
  "/notes/:id",
  deleteNoteValidationRules(),
  validate,
  noteController.deleteNote
);

app.listen(8080);

export default app;
