var express = require('express');
var router = express.Router();

const { csrfProtection, asyncHandler } = require("./utils");

const { User, Pawst } = require("../db/models");


/* GET home page. */
router.get('/', asyncHandler (async (req, res, next) => {
  // const userId = parseInt(req.params.id, 10);
  // const user = await User.findByPk(userId);
  // const { userName, email } = user;
  const posts = await Pawst.findAll({
    order: [['createdAt', 'DESC']],
    include: User
  });

  return res.render("index", {
    title: 'Meowdium',
    posts
  });
}));

module.exports = router;
