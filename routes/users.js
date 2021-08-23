var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs')

const { csrfProtection, asyncHandler } = require('./utils');

const { User } = require('../db/models');


// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.get("/signup", csrfProtection, asyncHandler (async (req, res, next) => {
  const user = await User.build();

  res.render('user-signup', {
    title: "Sign Up",
    user,
    csrfToken: req.csrfToken()
  });
}));

router.post("/signup", csrfProtection, asyncHandler (async (req, res, next) => {
  res.send("respond with a resource");
}));

module.exports = router;
