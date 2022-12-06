const ERROR_HANDLER = {
    JsonWebTokenError : res => res.status(401).json({error:'token missing or invalid'}),
    TokenExpiredError : res => res.status(401).json({error:'token Expired'}),
    defaultError: (res,err) => {
        const status = err.status || 500;
        const message = err.message || err;
        console.error(err);
        res.status(status).send(message);
    }

};

const errorHandler = (err, req, res, next) => {
    // eslint-disable-line no-unused-vars

    const handler = ERROR_HANDLER[err.name] || ERROR_HANDLER.defaultError;
    handler(res,err);
    next();
}

module.exports = {
    errorHandler,
}