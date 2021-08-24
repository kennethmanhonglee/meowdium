var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs')
const { check, validationResult } = require('express-validator')

const { csrfProtection, asyncHandler } = require('./utils');
const { loginUser } = require('../auth');

const { User } = require('../db/models');

// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

const signupValidators = [
  check('userName')
    .exists({ checkFalsy: true })
    .withMessage('Please input a Username.')
    .isLength({ min: 2, max: 50 })
    .withMessage('Your Username must between 1 and 50 characters long.')
    .matches(/\w+/)
    .withMessage('Your Username must be alphanumeric. Example: ( a-z, A-Z, _ )'),
  check('emailAddress')
    .exists({ checkFalsy: true })
    .withMessage('Please enter an email address.')
    .isLength({ max: 255 })
    .withMessage('Email address must not be longer than 255 characters.')
    .isEmail()
    .withMessage('Please input a valid email address.')
    // add custom validator for email
    .custom((value) => {
      return User.findOne({ where: { email: value } })
        .then((user) => {
          if (user) return Promise.reject('The provided Email Address is already in use.')
        })
    }),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please enter a valid password.')
    .isLength({ min: 8, max: 50 })
    .withMessage('Password must be between 8 and 50 characters long.')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, 'g')
    .withMessage('Password must contain at least 1 lowercase letter, uppercase letter, number, and special character (i.e. "!@#$%^&*()"'),
  check('confirmPassword')
    .exists({ checkFalsy: true })
    .withMessage('Please re-type your password to confirm it.')
    .custom((value, { req }) => {
      if (value !== req.body.password) throw 'Confirm password does not match Password.';
      return true;
    })
];

const loginValidators = [
  check('userName')
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
  if (res.locals.authenticated) {
    return res.redirect('/');
  }

  const user = await User.build();

  res.render('user-signup', {
    title: "Sign Up",
    user,
    csrfToken: req.csrfToken()
  });
}));

router.post("/signup", csrfProtection, signupValidators, asyncHandler(async (req, res, next) => {
  const { userName, email, password } = req.body;
  const user = await User.build({ userName, email });

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
  if (res.locals.authenticated) {
    return res.redirect('/');
  }

  const user = await User.build();
  return res.render('user-login', { title: 'Login', csrfToken: req.csrfToken(), user });
}));

router.post('/login', csrfProtection, loginValidators, asyncHandler(async (req, res) => {
  const { userName, password } = req.body;

  let errors = [];

  // validate userName and password
  const validationErrors = validationResult(req);
  if (validationErrors.isEmpty()) {
    //try to find user
    let user = await User.findOne({
      where: {
        userName: userName
      }
    });

    if (user) {
      // check pw
      const matchingPW = await bcrypt.compare(password, user.hashedPassword.toString());
      if (matchingPW) {
        // happy path
        loginUser(req, res, user);
        return res.redirect('/');
      } else {
        // userName right, pw wrong
        const errMsg = 'Invalid Username/Password';
        errors.push(errMsg);
        return res.render('user-login', {
          title: 'Login',
          errors,
          csrfToken: req.csrfToken(),
          user
        })
      }
    } else {
      // cannot find user with userName
      user = await User.build();
      const errMsg = 'Invalid Username/Password';
      errors.push(errMsg);
      return res.render('user-login', {
        title: 'Login',
        errors,
        csrfToken: req.csrfToken(),
        user
      })
    }
  } else {
    // something wrong with userName/password
    user = await User.build();
    errors = validationErrors.array().map((error) => error.msg);
    return res.render('user-login', {
      title: 'Login',
      errors,
      csrfToken: req.csrfToken(),
      user
    })
  }
}));

module.exports = router;
