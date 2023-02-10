const AppError = require('../utils/appError');

const handleCastErrorDB = (err) => {
  return new AppError(`Invalid ${err.path}: ${err.value}`, 400);
};

const handleValidationErrorDB = (err) => {
  const message = Object.values(err.errors)
    .map((err) => err.message)
    .join('. ');
  return new AppError(`Invalid input data. ${message}`, 400);
};

const handleDuplicateFieldErrorDB = (err) => {
  const keyValue = Object.entries(err.keyValue)[0];
  return new AppError(`Duplicate ${keyValue[0]}: ${keyValue[1]}. Please use another value.`, 400);
};

const sendErrorDev = (err, res) => {
  res.status(err.statusCode || 500).json({
    status: err.status || 'error',
    message: err.message,
    error: err,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode || 500).json({
      status: err.status || 'error',
      message: err.message,
    });
  } else {
    // console.error(err);

    res.status(500).json({
      status: 'error',
      message: 'something went wrong',
    });
  }
};

module.exports = (err, req, res, next) => {
  const nodeENV = process.env.NODE_ENV;

  if (nodeENV === 'development') {
    sendErrorDev(err, res);
  } else if (nodeENV === 'production') {
    let error = Object.assign(err);

    if (error.name === 'CastError') {
      error = handleCastErrorDB(error);
    }

    if (error.name === 'ValidationError') {
      error = handleValidationErrorDB(error);
    }

    if (error.code === 11000) {
      error = handleDuplicateFieldErrorDB(error);
    }

    sendErrorProd(error, res);
  }
};
