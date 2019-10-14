const express = require('express');
const router = express.Router();
const House = require('../models/house');
const Joi = require('@hapi/joi');

router.get('/', async (req, res) => {
    try {
        const houses = await House.readAll();

        return res.json(houses);
    } catch (err) {
        return res.status(err.code).json(err);
    }

});
router.get('/:id', async (req, res) => {
    const schema = Joi.object().keys({
        "id": Joi.number().integer().min(1).required()
    });
    const { error } = schema.validate(req.params);
    if (error) return res.status(400).json({ code: 400, message: `Bad request. ${JSON.stringify(error.details)}` });

    try {
        const house = await House.readById(req.params.id);
        return res.json(house);
    } catch (err) {
        return res.status(err.code).json(err);
    }
});


module.exports = router;