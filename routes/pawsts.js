var express = require('express');
var router = express.Router();
const { check, validationResult } = require('express-validator')

const { csrfProtection, asyncHandler } = require('./utils');

const { User, Pawst } = require('../db/models');

const pawstValidators = [
  check('title')
    .exists({ checkFalsy: true })
    .withMessage('Please input a valid Title.'),
  check('content')
    .exists({ checkFalsy: true })
    .withMessage('Content can\'t be empty.')
];

router.get('/new', csrfProtection, asyncHandler(async (req, res, next) => {
  if (!res.locals.authenticated) {
    return res.redirect('/users/login');
  }

  const post = await Pawst.build();
  return res.render('new-pawst', {
    title: 'New Pawst',
    post,
    csrfToken: req.csrfToken()
  });
}));

router.post("/", csrfProtection, pawstValidators, asyncHandler(async (req, res, next) => {
  if (!res.locals.authenticated) {
    return res.redirect('/users/login');
  }

  const { title, subtitle, content } = req.body;
  const post = await Pawst.build({ title, subtitle, content, userId: req.session.auth.userId });

  const validationErrors = validationResult(req);

  if (validationErrors.isEmpty()) {
    await post.save();
    return res.redirect('/');
  } else {
    const errors = validationErrors.array().map((error) => error.msg);
    return res.render('new-pawst', {
      title: 'New Pawst',
      post,
      errors,
      csrfToken: req.csrfToken()
    })
  }
}))

router.get('/:id(\\d+)', asyncHandler(async (req, res) => {
  const postId = parseInt(req.params.id, 10);
  const post = await Pawst.findByPk(postId);
  const { userId } = post;
  const user = await User.findByPk(userId);
  const { userName, email } = user;

  return res.render('pawst', {
    post,
    userName,
    email
  })
}))

module.exports = router;
