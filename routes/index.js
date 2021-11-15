var express = require("express");
var router = express.Router();

const { csrfProtection, asyncHandler } = require("./utils");

const { User, Pawst } = require("../db/models");

/* GET home page. */
router.get(
  "/",
  asyncHandler(async (req, res, next) => {
    if (!res.locals.authenticated)
      res.render("splash", {
        title: "Meowdium",
      });

    const posts = await Pawst.findAll({
      order: [["createdAt", "DESC"]],
      include: [User],
      limit: 15,
    });

    return res.render("index", {
      title: "Meowdium",
      posts,
    });
  })
);

module.exports = router;
