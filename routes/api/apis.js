const express = require('express');
const router = express.Router();

const { User, Pawst, Catnip, Pawment } = require('../../db/models');
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
    let catnipsCount = await Catnip.count();

    if (existingCatnip) {
        // unlike post - delete catnip from db, send back 'deleted'
        await existingCatnip.destroy();
        catnipsCount--;
        return res.status(200).json({
            catnipsCount,
            deleted: true
        });
    } else {
        const newCatnip = await Catnip.create({
            pawstId,
            userId
        })
        catnipsCount++;
        return res.status(201).json({
            catnipsCount,
            deleted: false
        });
    }
}));

router.post('/pawments/:id(\\d+)/delete', asyncHandler(async (req, res) => {
    if (!res.locals.authenticated) {
        return res.status(404).json('You are not logged in!');
    }

    const pawmentId = parseInt(req.params.id, 10);
    console.log('this is thwe pawmentId', pawmentId);
    const pawmentToDelete = await Pawment.findByPk(pawmentId);
    console.log(pawmentToDelete);
    if (res.locals.user.id === pawmentToDelete.userId) {
        await pawmentToDelete.destroy();
        return res.status(200).json({ pawmentId });
    } else {
        return res.status(404).json('You are not the user!');
    }

}))


module.exports = router;