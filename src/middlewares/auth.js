const jwt = require('jsonwebtoken');
const User = require('../models/User');
const ErrorResponse = require('../utils/ErrorResponse');

const auth = async (req, res, next) => {
    try {
        let token ;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')){
             token = req.headers.authorization.split(' ')[1];
        }else if (req.cookies.token){
            token = req.cookies.token
        }

        if (!token)
            return next(
                new ErrorResponse(`Invalid token`, 401)
            )
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findById(decoded._id)
        req.user = user;
        next()
    } catch (err) {
        return next (
            new ErrorResponse(`Problem with authorization` , 400)
        )
    }

}

const authorize = (...roles) => (req, res, next) => {
    if (!roles.includes(req.user.role))
        return next(
            new ErrorResponse(`role '${req.user.role}'  is not allowed`, 401)
        )
    next()
}

module.exports = {
    auth,
    authorize
}