const express = require('express');
const router = express.Router();
const Movie = require('../models/movie');
const Joi = require('@hapi/joi');

router.get('/', async (req, res) => {
    try {
        const movies = await Movie.readAll();

        return res.json(movies);
    } catch (err) {
        return res.status(err.code).json(err);
    }

});


module.exports = router;