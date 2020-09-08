const jwt = require('jsonwebtoken');

const config = require('config');

module.exports = async (req, res, next) => {
    const token = req.header('x-auth-token');

    if(!token) {
        return res.status(401).json({msg:"No Token"})
    }

    try {

         const decoded = jwt.verify(token, config.get('JWT_SECRET'));

         req.user = decoded.user

         next();

        
    } catch (err) {
    console.log(err.message);
    return res.status(500).json({ msg: 'Invalid token' });
    }
}