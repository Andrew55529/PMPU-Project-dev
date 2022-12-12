const ApiErrpr = require('../exceptions/api-error');
const tokenService = require('../service/token-service');

module.exports = function (req, res, next) {
    try {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            return next(ApiErrpr.UnauthotizedError('DEBUG 4'));
        }

        const accessToken = authorizationHeader.split(' ')[1];
        if (!accessToken) {
            return next(ApiErrpr.UnauthotizedError('DEBUG 5'));
        }

        const userData = tokenService.validateAccessToken(accessToken);
        if (!userData) {
            return next(ApiErrpr.UnauthotizedError('DEBUG 6'));
        }
        req.user = userData;
        next();
    } catch (e) {
        return next(ApiErrpr.UnauthotizedError());
    }

}