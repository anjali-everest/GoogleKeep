import express from "express";
import NoteController from "./api/controller/NoteController";
import cors from "cors";
import {
  addNoteValidation,
  getNoteValidation,
  updateNoteValidation,
  deleteNoteValidation,
} from "./api/validation/validator";
import NoteService from "./api/service/NoteService";

const app = express();
app.use(express.json());
app.use(cors());

const noteController = new NoteController(new NoteService());
app.get("/notes", noteController.getAllNotes);
app.get("/notes/:id", getNoteValidation, noteController.getOneNote);
app.post("/notes", addNoteValidation, noteController.addNote);
app.put("/notes/:id", updateNoteValidation, noteController.updateNote);
app.delete("/notes/:id", deleteNoteValidation, noteController.deleteNote);

app.listen(8080);

export default app;
