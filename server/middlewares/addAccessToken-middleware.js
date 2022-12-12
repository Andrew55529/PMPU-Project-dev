const ApiErrpr = require('../exceptions/api-error');

module.exports = function (req, res, next) {
    try {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            return next(ApiErrpr.UnauthotizedError('DEBUG 10'));
        }

        const accessToken = authorizationHeader.split(' ')[1];
        if (!accessToken) {
            return next(ApiErrpr.UnauthotizedError('DEBUG 11'));
        }

        req.accessToken=accessToken;
        next();
    } catch (e) {
        return next(ApiErrpr.UnauthotizedError('DEBUG 12'));
    }

}