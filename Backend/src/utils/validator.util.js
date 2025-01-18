const { body, validationResult } = require("express-validator");

const validate = (validations) => {
  return async (req, res, next) => {
    for (const validation of validations) {
      const result = await validation.run(req);
      if (!result.isEmpty()) {
        errors = validationResult(req)
          return res.status(400).json({errors: errors.array()})
      }

     
    }
    next();
  };
};

const logInValidator = [
    body("email").isEmail().withMessage('Invalid email format').trim().notEmpty().withMessage("Email is required"),
    body("password")
      .trim()
      .isLength({ min: 6 }) 
      .withMessage("Password should be atleast 6 character")
      .notEmpty()
      .withMessage('password is required'),
  ];

const signupValidator = [
    body("name").notEmpty().withMessage("name is required"),
    ...logInValidator,

    // body("email").isEmail().withMessage('Invalid email format').trim().notEmpty().withMessage("Email is required"),
    //  body("password")
    // .trim()
    // .isLength({ min: 6 }) 
    // .withMessage("Password should be atleast 6 character")
    // .notEmpty()
    // .withMessage('password is required'),
];





module.exports = {validate , signupValidator,logInValidator}