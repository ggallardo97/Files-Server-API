function errorHandler(err, req, res, next){

    switch(err.name){

        case 'UnauthorizedError': res.status(401).json({
                error: 'user not authorized'
            });
        break;

        case 'ValidationError':  res.status(401).json({
                error: 'validation error'
            });
        break;

        default: res.status(500).json({
                error: 'server error'
            });
    }
}

module.exports = errorHandler;