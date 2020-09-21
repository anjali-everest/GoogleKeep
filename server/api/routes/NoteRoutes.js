const { Router } = require("express");
const NoteController = require("../controller/NoteController");
const Validator = require("../validation/Validator");
const NoteService = require("../service/NoteService");

const noteRouter = Router();
const noteController = new NoteController(new NoteService());

noteRouter.get("/notes", noteController.getAllNotes);
noteRouter.get(
  "/notes/:id",
  Validator.applyGetNoteRules(),
  Validator.validateRules,
  noteController.getOneNote
);
noteRouter.post(
  "/notes",
  Validator.applyAddNoteRules(),
  Validator.validateRules,
  noteController.addNote
);
noteRouter.put(
  "/notes/:id",
  Validator.applyUpdateNoteRules(),
  Validator.validateRules,
  noteController.updateNote
);
noteRouter.delete(
  "/notes/:id",
  Validator.applyDeleteNoteRules(),
  Validator.validateRules,
  noteController.deleteNote
);

module.exports = noteRouter;
