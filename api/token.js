const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const cryptoRandom = crypto.randomBytes(64).toString('hex');

const withAuth = function(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        // res.send(req.data); 
        res.status(401).send('Unauthorized: no token provided');
    } else {
        jwt.verify(token, cryptoRandom, function(err, decoded) {
            if (err) {
                res.status(401).send('Unauthorized: Invalid token');
            } else {
                req.username = decoded.username;
                next();
            }
        })
    }
}

module.exports = withAuth;