import pkg from "express-validator";
const { body, param, validationResult } = pkg;

const addNoteValidation = (req, res, next) => {
  body("title").optional().isString(), body("content").optional().isString();
  validate(req, res, next);
};

const getNoteValidation = (req, res, next) => {
  param("id").not().isEmpty().isInt();
  validate(req, res, next);
};

const updateNoteValidation = (req, res, next) => {
  param("id").not().isEmpty().isInt(),
    body("title").optional().isString(),
    body("content").optional().isString();

  validate(req, res, next);
};

const deleteNoteValidation = (req, res, next) => {
  param("id").not().isEmpty().isInt();
  validate(req, res, next);
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
  getNoteValidation,
  updateNoteValidation,
  deleteNoteValidation,
};
