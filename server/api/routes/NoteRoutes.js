const { Router } = require("express");
const NoteController = require("../controller/NoteController");
const Validator = require("../validation/Validator");
const NoteService = require("../service/NoteService");

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

module.exports = noteRouter;
