const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) return res.status(400).json({ code: 400, message: 'Bad request. No token provided' });

    try {
        const decryptedToken = jwt.verify(token, config.get('jwtPrivateKey'));

        req.hpUserID = decryptedToken.id;

        next();

    } catch (err) {
        return res.status(403).json({ code: 403, message: 'Forbidden. Invalid token' });
    }
}