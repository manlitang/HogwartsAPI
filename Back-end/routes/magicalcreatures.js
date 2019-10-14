const express = require('express');
const router = express.Router();
const MagicalCreature = require('../models/magicalcreature');
const Joi = require('@hapi/joi');

router.get('/', async (req, res) => {
    try {
        const magicalcreatures = await MagicalCreature.readAll();

        return res.json(magicalcreatures);
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
        const magicalCreature = await MagicalCreature.readById(req.params.id);
        return res.json(magicalCreature);
    } catch (err) {
        return res.status(err.code).json(err);
    }
});


module.exports = router;