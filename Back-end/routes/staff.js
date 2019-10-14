const express = require('express');
const router = express.Router();
const CharacterStaff = require('../models/staff'); 
const Joi = require('@hapi/joi');

router.get('/', async (req, res) => {
    try {
        const charactersstaff = await CharacterStaff.readAll();

        return res.json(charactersstaff);
    } catch (err) {
        return res.status(err.code).json(err);
    }

});

module.exports = router;