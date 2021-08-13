const ErrorResponse = require('../utils/ErrorResponse')
const fs = require('fs')
const errorHandling = (err, req, res, next) => {
    let error = Object.assign(err);

    if (err.name === 'CastError') {
        const message = `Resource not found`;
        error = new ErrorResponse(message, 404);
    }

    if (err.name === 'ValidationError') {
        const message = error.message;
        error = new ErrorResponse(message, 400);
    }

    if (err.code === 11000) {
        const message = `Duplicate field value`;
        error = new ErrorResponse(message, 400);
    }

    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message
    })
}

module.exports = errorHandling