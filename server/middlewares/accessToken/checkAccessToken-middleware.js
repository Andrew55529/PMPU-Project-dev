const ApiErrpr = require('../../exceptions/api-error');
const tokenService = require("../../service/token-service");

module.exports = function (req, res, next) {
    try {
        const ATD = tokenService.validateAccessToken(req.AT);
        if (!ATD) {
            return next(ApiErrpr.UnauthotizedError('DEBUG 6'));
        }
        req.ATD = ATD;
        next();
    } catch (e) {
        return next(ApiErrpr.UnauthotizedError('DEBUG 12'));
    }

}