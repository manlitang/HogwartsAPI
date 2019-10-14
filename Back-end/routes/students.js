const express = require('express');
const router = express.Router();
const CharacterStudent = require('../models/student'); 
const Joi = require('@hapi/joi');

router.get('/', async (req, res) => {
    try {
        const students = await CharacterStudent.readAll();

        return res.json(students);
    } catch (err) {
        return res.status(err.code).json(err);
    }

});

module.exports = router;