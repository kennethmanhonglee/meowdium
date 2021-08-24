var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs')
const { check, validationResult } = require('express-validator')
const { csrfProtection, asyncHandler } = require('./utils');

const { User } = require('../db/models');

// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

const signupValidators = [
  check('username')
    .exists({ checkFalsy: true })
    .withMessage('Please input a valid Username.')
    .isLength({ min: 2, max: 50 })
    .withMessage('Username must be greater than 1 characters and less than 50 characters.')
    .matches(/\w+/)
    .withMessage('Username must be alphanumeric. Example: ( a-z, A-Z, _ )'),
  check('emailAddress')
    .exists({ checkFalsy: true })
    .withMessage('Please input a valid email address.')
    .isLength({ max: 255 })
    .withMessage('Email address must not be longer than 255 characters.')
    .isEmail()
    .withMessage('Please input a valid email address.')
    // add custom validator for email
    .custom((value) => {
      return User.findOne({ where: { emailAddress: value } })
        .then((user) => {
          if (user) return Promise.reject('The provided Email Address is already in use.')
        })
    }),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please enter a valid password.')
    .isLength({ min: 8, max: 50 })
    .withMessage('Password must not be longer than 50 characters.')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, 'g')
    .withMessage('Password must contain at least 1 lowercase letter, uppercase letter, number, and special character (i.e. "!@#$%^&*()"'),
  check('confirmPassword')
    .exists({ checkFalsy: true })
    .withMessage('Please enter a valid password.')
    .isLength({ min: 8, max: 50 })
    .withMessage('Password must not be longer than 50 characters.')
    .custom((value, { req }) => {
      if (value !== req.body.password) throw new Error('Confirm password does not match Password.')
      return true;
    })
];

const loginValidators = [
  check('username')
    .exists({ checkFalsy: true })
    .withMessage('Please input a valid Username.'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please input a valid Password.')
    .isLength({ min: 8, max: 50 })
    .withMessage('Hint: Password must not be longer than 50 characters.')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, 'g')
    .withMessage('Hint: Password must contain at least 1 lowercase letter, uppercase letter, number, and special character (i.e. "!@#$%^&*()")')
];

router.get("/signup", csrfProtection, asyncHandler(async (req, res, next) => {
  const user = await User.build();

  res.render('user-signup', {
    title: "Sign Up",
    user,
    csrfToken: req.csrfToken()
  });
}));

router.post("/signup", csrfProtection, signupValidators, asyncHandler(async (req, res, next) => {
  const { username, email, password } = req.body;
  const user = await User.build({ username, email });

  const validationErrors = validationResult(req);

  if (validationErrors.isEmpty()) {
    const hashedPassword = await bcrypt.hash(password, 10);
    user.hashedPassword = hashedPassword;
    await user.save();
    // TODO: log user in
    return res.redirect('/') // subject to change
  } else {
    const errors = validationErrors.array().map((error) => error.msg);
    return res.render('user-signup', {
      title: 'Register',
      user,
      errors,
      csrfToken: req.csrfToken()
    })
  }


}));

router.get('/login', csrfProtection, asyncHandler(async (req, res) => {
  res.render('user-login', { title: 'Login', csrfToken: req.csrfToken() });
}));

router.post('/login', csrfProtection, asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  // validate username and password
}));

module.exports = router;
