const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

router.post('/', async (req, res) => {
    console.log('about to validate user input');
    console.log(JSON.stringify(req.body));

    const { error } = User.validate(req.body);
    if (error) return res.status(400).json({ code: 400, message: 'Bad request' });
    console.log('user input is validated');

    try {
        const user = await User.readByEmail(req.body.email);

        const match = await bcrypt.compare(req.body.password, user.password);
        if (!match) throw { code: 401, message: 'Incorrect user email or password' }

        const tokenPayload = {
            id: user.id
        }
        const token = jwt.sign(tokenPayload, config.get('jwtPrivateKey'));

        res.set({
            "x-auth-token": token
        });

        return res.json(user);

    } catch (err) {
        return res.status(err.code).json(err);
    }
});

module.exports = router;