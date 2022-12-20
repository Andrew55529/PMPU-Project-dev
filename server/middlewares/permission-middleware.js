const ApiErrpr = require('../exceptions/api-error');
const UserService = require('../service/user-service');

module.exports = function(permission) {
    return function(req, res, next) {

        if (!req.ATD["permission"]) {
            return next(ApiErrpr.UnauthotizedError('DEBUG 40'));
        }
        if (!req.ATD["permission"].includes(permission)) {
            return next(ApiErrpr.UnauthotizedError('DEBUG 41'));
        }
        if (UserService.checkPermissionDB(req.ATD["userId"],permission)===false) {
            return next(ApiErrpr.UnauthotizedError('DEBUG 42'));
        }
        next();

    }
}