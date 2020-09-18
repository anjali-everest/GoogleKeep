import pkg from "express-validator";
const { body, param, validationResult } = pkg;

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
    body("title").optional().isString(),
    body("content").optional().isString(),
  ];
};

const deleteNoteValidationRules = () => {
  return [param("id").not().isEmpty().isInt()];
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
