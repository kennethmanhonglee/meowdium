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

router.get('/new', csrfProtection, asyncHandler(async( req, res, next) => {
    if (!res.locals.authenticated) {
        return res.redirect('/users/logi');
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


module.exports = router;
