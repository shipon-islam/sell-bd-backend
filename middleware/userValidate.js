const { check, validationResult } = require("express-validator");

const userValidation = [
  check("username").isLength({ min: 1 }).withMessage("user name is required"),
  check("email").isEmail().withMessage("invalid email address"),
  check("password")
    .isStrongPassword()
    .withMessage(
      "plzz must be a strong password with min-8 char,uppercase lowercase and symble"
    ),
];

const addUserValidate = (req, res, next) => {
  const errors = validationResult(req);
  const mappedErrors = errors.mapped();
  if (Object.keys(mappedErrors).length === 0) {
    next();
  } else {
    res.status(201).json({
      errors: mappedErrors,
    });
  }
};

module.exports = {
  userValidation,
  addUserValidate,
};
