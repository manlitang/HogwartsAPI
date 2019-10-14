const express = require('express');
const router = express.Router();
const Character = require('../models/character');
const Joi = require('@hapi/joi');
const auth = require('../middleware/auth');

router.get('/', async (req, res) => {
    try {
        const characters = await Character.readAll();

        return res.json(characters);
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
        const character = await Character.readById(req.params.id);
        return res.json(character);
    } catch (err) {
        return res.status(err.code).json(err);
    }
});

router.post('/', [auth], async (req, res) => {
    const { error } = Character.validate(req.body);
    if (error) return res.status(400).json({ code: 400, message: `Bad request.${ JSON.stringify(error.details) } `});

try {
    const newCharacter = await new Character(req.body).create();
    return res.json(newCharacter);
} catch (err) {
    return res.status(err.code).json(err);
}
});


module.exports = router;