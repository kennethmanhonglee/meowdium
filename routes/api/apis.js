const express = require('express');
const router = express.Router();

const { User, Pawst, Catnip } = require('../../db/models');
const { csrfProtection, asyncHandler } = require('../utils');

// todo - add csrfProtection
router.post('/pawsts/:id(\\d+)/catnips', asyncHandler(async (req, res) => {
    // TODO - verify that the user is logged in
    const pawstId = parseInt(req.params.id, 10);
    const { userId } = req.body;
    const existingCatnip = await Catnip.findOne({
        where: {
            pawstId,
            userId
        }
    })

    // ask about status code?
    if (existingCatnip) {
        return res.status(409).json('Already created');
    } else {
        const newCatnip = await Catnip.create({
            pawstId,
            userId
        })
        return res.status(201).json(newCatnip);
    }
}));

// TODO - use userId and pawstId to find it instead
// userId in session, pawstId can be found and attached to body of delete
router.delete('/catnips/:id(\\d+)', asyncHandler(async (req, res) => {
    // TODO - verify that the user is logged in
    const catnipId = parseInt(req.params.id, 10);
    const { userId } = req.body;
    const existingCatnip = await Catnip.findByPk(catnipId);
    if (existingCatnip) {
        await existingCatnip.destroy();
        return res.status(200).json('deleted');
    } else {
        return res.status(404).json('Not Found');
    }
}));



module.exports = router;