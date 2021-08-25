var express = require('express');
var router = express.Router();
const { check, validationResult } = require('express-validator')

const asyncHandler = require('./utils');

const { User, Pawst } = require('../db/models');

const pawstValidators = [
  check('title')
    .exists({ checkFalsy: true })
    .withMessage('Please input a valid Title.'),
  check('content')
    .exists({ checkFalsy: true })
    .withMessage('Content can\'t be empty.')
];
