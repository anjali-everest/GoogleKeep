import pkg from "express-validator";
const { body, param, validationResult } = pkg;

export default class Validator {
  static addNoteValidation = (req, res, next) => {
    body("title").optional().isString(), body("content").optional().isString();
    this.validate(req, res, next);
  };

  static getNoteValidation = (req, res, next) => {
    param("id").not().isEmpty().isInt();
    this.validate(req, res, next);
  };

  static updateNoteValidation = (req, res, next) => {
    param("id").not().isEmpty().isInt(),
      body("title").optional().isString(),
      body("content").optional().isString();

    this.validate(req, res, next);
  };

  static deleteNoteValidation = (req, res, next) => {
    param("id").not().isEmpty().isInt();
    this.validate(req, res, next);
  };

  validate = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    return res.status(422).json(errors);
  };
}
