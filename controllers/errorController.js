const AppError = require("../utils/AppError");

const handleCastErrorDB = (err) => {
    const message = `Invalid ${err.path}: ${err.value}`;

    return new AppError(message, 400);
}

const handleDuplicateFieldsDB = (error) => {
    const value = JSON.stringify(error.keyValue);
    const message = `Duplicate field ${value}. Please use another value!`

    return new AppError(message, 400);
}

const handleValidationErrorDB = (error) => {
    const errors = Object.values(error.errors).map(el => el.message);
    const message = `Invalit data. ${errors.join('. ')}`
    console.log(message)

    return new AppError(message, 400);
}

const handlerJWTError = () => new AppError('Token error! Please, log in again.', 401);

const handlerJWTExpiredError = () =>  new AppError('Token has expired! Please, log in again.', 401);

const sendErrorDev = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack
    })
}

const sendErrorProd = (err, res) => {
    if (err.isOperational) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
        })
    } else {
        console.error('ERROR', err);

        res.status(500).json({
            status: "error",
            message: "Somthing went wrong!"
        })
    }
}

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";

    if(process.env.NODE_ENV === "development") {
        sendErrorDev(err, res);
    } else if(process.env.NODE_ENV === "production"){
        let error = {...err};

        if(err.name === "CastError") error = handleCastErrorDB(error);
        if(err.code === 11000) error = handleDuplicateFieldsDB(error);
        if(err.name === "ValidationError") error = handleValidationErrorDB(error)
        if(err.name === "JsonWebTokenError") error = handlerJWTError();
        if(err.name === "TokenExpiredError") error = handlerJWTExpiredError()

        sendErrorProd(error, res);
    }
}