const jwt = require('jsonwebtoken');


function verifyToken (req, res, next){
    // Access Authorization from req header
    const Authorization = req.header('authorization');

    if(!Authorization){
        // Error: Unauthorization
    }
    // get token
    const token = Authorization.replace('Bearer ','');
    // Verify Token
    const {userId} = jwt.verify(token, process.env.APP_SECRET);

    // Assign req
    req.user = {userId};
    next();
}

module.exports = verifyToken;
