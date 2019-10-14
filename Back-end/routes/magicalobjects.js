const express = require('express');
const router = express.Router();
const MagicalObject = require('../models/magicalobject');
const Joi = require('@hapi/joi');

router.get('/', async (req, res) => {
    try {
        const magicalobjects = await MagicalObject.readAll();

        return res.json(magicalobjects);
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
        const magicalObject = await MagicalObject.readById(req.params.id);
        return res.json(magicalObject);
    } catch (err) {
        return res.status(err.code).json(err);
    }
});

module.exports = router;