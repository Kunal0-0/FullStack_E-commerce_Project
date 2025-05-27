function customMiddleware(req, res, next) {
    const expressObject = {
        request: JSON.parse(JSON.stringify(req.body || {})),
        response: {}
    }

    next();
}

module.exports = customMiddleware;