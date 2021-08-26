const express = require('express');
const router = express.Router();

const { User, Pawst, Catnip } = require('../../db/models');
const { csrfProtection, asyncHandler } = require('../utils');

router.post('/pawsts/:id(\\d+)/catnips', asyncHandler(async (req, res) => {
    // TODO - verify that the user is logged in
    if (!res.locals.authenticated) {
        return res.status(404).json('You are not logged in!');
    }

    const pawstId = parseInt(req.params.id, 10);
    const userId = res.locals.user.id;
    const existingCatnip = await Catnip.findOne({
        where: {
            pawstId,
            userId
        }
    })

    if (existingCatnip) {
        // unlike post - delete catnip from db, send back 'deleted'
        await existingCatnip.destroy();
        return res.status(200).json('deleted');
    } else {
        const newCatnip = await Catnip.create({
            pawstId,
            userId
        })
        return res.status(201).json(newCatnip);
    }
}));



module.exports = router;