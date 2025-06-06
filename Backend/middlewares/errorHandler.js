function errorHandler(err, req, res, next) {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        status: false,
        message: err.message || "Internal Server Error",
    });
}

module.exports = errorHandler;