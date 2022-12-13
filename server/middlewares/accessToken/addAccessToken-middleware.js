const ApiErrpr = require('../../exceptions/api-error');
// Add access token to request
module.exports = function (req, res, next) { // Test
    try {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            return next(ApiErrpr.UnauthotizedError('DEBUG 10'));
        }

        const accessToken = authorizationHeader.split(' ')[1];
        if (!accessToken) {
            return next(ApiErrpr.UnauthotizedError('DEBUG 11'));
        }

        req.AT=accessToken;
        next();
    } catch (e) {
        return next(ApiErrpr.UnauthotizedError('DEBUG 12'));
    }

}