import pkg from "express";
import NoteController from "../controller/NoteController";
import Validator from "../validation/Validator";
import NoteService from "../service/NoteService";

const { Router } = pkg;
const noteRouter = Router();
const noteController = new NoteController(new NoteService());

noteRouter.get("/notes", noteController.getAllNotes);
noteRouter.get(
  "/notes/:id",
  Validator.getNoteValidation,
  noteController.getOneNote
);
noteRouter.post("/notes", Validator.addNoteValidation, noteController.addNote);
noteRouter.put(
  "/notes/:id",
  Validator.updateNoteValidation,
  noteController.updateNote
);
noteRouter.delete(
  "/notes/:id",
  Validator.deleteNoteValidation,
  noteController.deleteNote
);

export default noteRouter;
