const { body, param, validationResult } = require("express-validator");

class Validator {
  static applyAddNoteRules = () => {
    return [
      body("title").optional().isString(),
      body("content").optional().isString(),
    ];
  };

  static applyGetNoteRules = () => {
    return [param("id").not().isEmpty().isInt()];
  };

  static applyUpdateNoteRules = () => {
    return [
      param("id").not().isEmpty().isInt(),
      body("title").optional().isString(),
      body("content").optional().isString(),
    ];
  };

  static applyDeleteNoteRules = () => {
    return [param("id").not().isEmpty().isInt()];
  };

  static validateRules = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    return res.status(422).json(errors);
  };
}

module.exports = Validator;
