import pkg from "express-validator";
import NoteService from "../service/NoteService";
const { body, param, validationResult } = pkg;
const noteService = new NoteService();

const addNoteValidation = () => {
  return [
    body("title").optional().isString(),
    body("content").optional().isString(),
  ];
};

const getNoteValidationRules = () => {
  return [param("id").not().isEmpty().isInt()];
};

const updateNoteValidationRules = () => {
  return [
    param("id").not().isEmpty().isInt(),
    param("id").custom(async (value) => {
      return await noteService.getOne(value).then((note) => {
        if (!note || note.length === 0) {
          return Promise.reject("Note not found with id");
        }
      });
    }),
    body("title").optional().isString(),
    body("content").optional().isString(),
  ];
};

const deleteNoteValidationRules = () => {
  return [
    param("id").not().isEmpty().isInt(),
    param("id").custom(async (value) => {
      return await noteService.getOne(value).then((note) => {
        if (!note || note.length === 0) {
          return Promise.reject("Note not found with id");
        }
      });
    }),
  ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  return res.status(422).json(errors);
};

export {
  addNoteValidation,
  getNoteValidationRules,
  updateNoteValidationRules,
  deleteNoteValidationRules,
  validate,
};
