const ErrorResponse = require("../utils/errorResponse");

const errorHandler = (err, req, res, next) => {

    let error = { ...err };

    console.log(err.red);
    
    if (err.name === 'CastError') {
        const message = `error  ${err.value}`;
        error = new ErrorResponse(message, 404)
    }

    if(err.code === 11000) {
        const message = 'Se duplico el valor';
        error = new ErrorResponse(message, 400);
    }

    if (err.name === 'ValidationError') {
        const message = Object.values(err.errors).map(val => val.message);
        error = new ErrorResponse(message, 400 );
    }

    console.log(err);

    res.status(err.statusCode || 500 ).json({
        success: false,
        error: err.message || 'error de Servidor'
    });
}


module.exports = errorHandler;