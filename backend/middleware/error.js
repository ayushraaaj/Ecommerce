// Handling the error while searching, if the 'id' in mongodb is wrong and the result is not found. 

const ErrorHandler = require('../utils/errorHandler');

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || 'Internal Server Error';

    // Wrong mongodb is that is incomplete id
    if(err.name === 'CastError'){
        const message = `Resource not found. Invalid: ${err.path}`;
        err = new ErrorHandler(message, 400);
    }

    if(err.code === 11000){
        const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
        err = new ErrorHandler(message, 400);
    }

    if(err.name === 'JsonWebTokenError'){
        const message = 'Json Web Token is invalid, try again';
        arr = new ErrorHandler(message, 400);
    }

    if(err.name === 'TokenExpiredError'){
        const message = 'Json Web Token is expired, try again';
        err = new ErrorHandler(message, 400);
    }

    res.status(err.statusCode).json({
        success: false,
        message: err.message
    });
}