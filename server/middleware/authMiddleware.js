const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    // console.log('req: ', req);
    const token = req.header('Authorization');
    // console.log('token444: ', token);
    if (!token) return res.status(401).json({ error: 'Access denied' });
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        // console.log('decoded: ', decoded);
        req.id = decoded.id;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
        
    }
}

module.exports = verifyToken;