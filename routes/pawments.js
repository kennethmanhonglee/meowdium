var express = require('express');
var router = express.Router();
const { check, validationResult } = require('express-validator')

const { csrfProtection, asyncHandler } = require('./utils');

const { User, Pawst, Pawment } = require('../db/models');

router.get('/pawments', asyncHandler(async (req, res, next) => {
  const pawments = await Pawment.findAll({
    order: [['createdAt', 'DESC']],
    include: User
  });

  return res.render("pawst", {
    pawments
  });
}));

module.exports = router;