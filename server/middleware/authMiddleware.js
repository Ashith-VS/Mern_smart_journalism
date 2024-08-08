const jwt = require('jsonwebtoken');

 const blacklistedTokens = new Set();

function verifyToken(req, res, next) {
    const authHeader = req.header('Authorization');
    if (!authHeader) return res.status(401).json({ error: 'Access denied' });

    const token = authHeader.split(' ')[1]
    if (!token) return res.status(401).json({ error: 'Token missing' });

    if (blacklistedTokens.has(token)) {
        return res.status(401).json({ error: 'Token has been invalidated' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        // console.log('decoded44: ', decoded);
        req.id = decoded.id;
        next();
    } catch (error) {
        // console.log('error: ', error);
        res.status(401).json({ error: 'Invalid token' });
    }
}

// Middleware to check if the token is blacklisted
function checkTokenBlacklist(req, res, next) {
    const token = req.header('Authorization')?.split(' ')[1];
    if (token && blacklistedTokens.has(token)) {
        return res.status(401).json({ error: 'Token has been invalidated' });
    }
    next();
}

module.exports = {verifyToken, checkTokenBlacklist, blacklistedTokens }