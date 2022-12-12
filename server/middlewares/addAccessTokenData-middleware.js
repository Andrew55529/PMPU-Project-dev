const ApiErrpr = require('../exceptions/api-error');
const tokenService = require('../service/token-service');

module.exports = function (req, res, next) {
    const data= tokenService.validateAccessToken(req.accessToken);
    if (data == null) {
        next(ApiErrpr.UnauthotizedError('DEBUG 22'));
    }
    req.accessTokenData=data;
    next();


}