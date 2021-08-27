var express = require('express');
var router = express.Router();
const { check, validationResult } = require('express-validator');
const createError = require('http-errors');

const { csrfProtection, asyncHandler } = require('./utils');

const { User, Pawst, Pawment, Catnip } = require('../db/models');
// const pawments = require('./pawments');

const pawstValidators = [
  check('title')
    .exists({ checkFalsy: true })
    .withMessage('Please input a valid Title.'),
  check('content')
    .exists({ checkFalsy: true })
    .withMessage('Content can\'t be empty.')
];

const pawmentValidators = [
  check('content')
    .exists({ checkFalsy: true })
    .withMessage('Pawment can\'t be empty.')
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

router.get('/:id(\\d+)', csrfProtection, asyncHandler(async (req, res, next) => {
  const postId = parseInt(req.params.id, 10);
  const post = await Pawst.findByPk(postId);
  if (!post) next(createError(404));

  const { userId } = post;
  const user = await User.findByPk(userId);
  const { userName, email } = user;
  const pawments = await Pawment.findAll({
    where: { pawstId: postId },
    order: [['createdAt', 'DESC']],
    include: User
  });
  const catnipsCount = await Catnip.count();

  return res.render('pawst', {
    title: post.title,
    post,
    userName,
    email,
    pawments,
    catnipsCount,
    csrfToken: req.csrfToken()
  })
}));

router.get('/:id(\\d+)/edit', csrfProtection, asyncHandler(async (req, res) => {
  if (!res.locals.authenticated) {
    return res.redirect('/users/login');
  }
  const postId = parseInt(req.params.id, 10);
  const post = await Pawst.findByPk(postId);
  if (res.locals.user.id !== post.userId) {
    return res.status(404).redirect('/');
  }
  return res.render('edit-pawst', {
    title: 'Edit Pawst',
    post,
    csrfToken: req.csrfToken()
  })
}));

router.post('/:id(\\d+)/edit', csrfProtection, pawstValidators, asyncHandler(async (req, res) => {
  if (!res.locals.authenticated) {
    return res.redirect('/users/login');
  }
  const { title, subtitle, content } = req.body
  const postId = parseInt(req.params.id, 10);
  const post = await Pawst.findByPk(postId);
  if (res.locals.user.id !== post.userId) {
    return res.status(404).redirect('/');
  }
  const validationErrors = validationResult(req);
  if (validationErrors.isEmpty()) {
    await post.update({
      title,
      subtitle,
      content
    })
    return res.redirect(`/pawsts/${postId}`);
  } else {
    const errors = validationErrors.array().map((error) => error.msg);
    return res.render('edit-pawst', {
      title: 'Edit Pawst',
      post,
      errors,
      csrfToken: req.csrfToken()
    })
  }
}));

router.post('/:id(\\d+)/delete', asyncHandler(async (req, res) => {
  if (!res.locals.authenticated) {
    return res.redirect('/users/login');
  }
  const postId = parseInt(req.params.id, 10);
  const post = await Pawst.findByPk(postId);
  const { userId } = post;

  if (res.locals.user.id !== post.userId) {
    return res.status(404).redirect('/');
  }

  await post.destroy();
  return res.redirect(`/users/${userId}`)

}));

router.post('/:id(\\d+)/pawments', csrfProtection, pawmentValidators, asyncHandler(async (req, res) => {
  if (!res.locals.authenticated) {
    return res.redirect('/users/login');
  }
  const { content } = req.body;
  const postId = parseInt(req.params.id, 10);
  const pawment = await Pawment.build({ content, userId: req.session.auth.userId, pawstId: postId })
  const validationErrors = validationResult(req);

  const user = await User.findByPk(req.session.auth.userId);
  const { userName, id: userId } = user;

  if (validationErrors.isEmpty()) {
    await pawment.save();
    const { id, createdAt } = pawment;
    return res.status(201).json({
      id,
      userId,
      content,
      userName,
      updated: updatedAt.toDateString()
    })
  } else {
    return res.status(406).json({
      emptyComment: true
    });
  }
}));

router.post('/pawments/:id(\\d+)/edit', csrfProtection, pawstValidators, asyncHandler(async (req, res) => {
  if (!res.locals.authenticated) {
    return res.redirect('/users/login');
  }
  const { content } = req.body
  const pawmentId = parseInt(req.params.id, 10);
  const pawment = await Pawment.findByPk(pawmentId);

  if (res.locals.user.id !== pawment.userId) {
    return res.status(404).redirect('/');
  }
  const validationErrors = validationResult(req);
  if (validationErrors.isEmpty()) {
    await pawment.update({
      content
    })
    return res.redirect(`/pawsts/${pawment.pawstId}`);
  } else {
    const errors = validationErrors.array().map((error) => error.msg);
    return res.render('pawst', {
      post,
      pawments,
      errors,
      csrfToken: req.csrfToken()
    })
  }
}));

module.exports = router;
