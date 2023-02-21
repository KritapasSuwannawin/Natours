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

const handleJWTErrorDB = () => {
  return new AppError('Invalid token. Pleanse login again.', 401);
};

const handleJWTExpiredErrorDB = () => {
  return new AppError('Your token has expired. Pleanse login again.', 401);
};

const sendErrorDev = (err, req, res) => {
  // A) API
  if (req.originalUrl.startsWith('/api')) {
    return res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  }

  // B) RENDERED WEBSITE
  console.error('ERROR 💥', err);
  return res.status(err.statusCode).render('error', {
    title: 'Something went wrong!',
    msg: err.message,
  });
};

const sendErrorProd = (err, req, res) => {
  // A) API
  if (req.originalUrl.startsWith('/api')) {
    // A) Operational, trusted error: send message to client
    if (err.isOperational) {
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
    }

    // B) Programming or other unknown error: don't leak error details
    // 1) Log error
    console.error('ERROR 💥', err);
    // 2) Send generic message
    return res.status(500).json({
      status: 'error',
      message: 'Something went very wrong!',
    });
  }

  // B) RENDERED WEBSITE
  // A) Operational, trusted error: send message to client
  if (err.isOperational) {
    console.log(err);
    return res.status(err.statusCode).render('error', {
      title: 'Something went wrong!',
      msg: err.message,
    });
  }
  // B) Programming or other unknown error: don't leak error details
  // 1) Log error
  console.error('ERROR 💥', err);
  // 2) Send generic message
  return res.status(err.statusCode).render('error', {
    title: 'Something went wrong!',
    msg: 'Please try again later.',
  });
};

module.exports = (err, req, res, next) => {
  const nodeENV = process.env.NODE_ENV;

  if (nodeENV === 'development') {
    sendErrorDev(err, req, res);
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

    if (error.name === 'JsonWebTokenError') {
      error = handleJWTErrorDB();
    }

    if (error.name === 'TokenExpiredError') {
      error = handleJWTExpiredErrorDB();
    }

    sendErrorProd(error, req, res);
  }
};
