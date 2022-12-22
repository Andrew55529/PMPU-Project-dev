const ApiErrpr = require('../exceptions/api-error');
const UserService = require('../service/user-service');

module.exports = function(permission) {
    return async function (req, res, next) {

        if (!req.ATD["permission"]) {
            return next(ApiErrpr.UnauthotizedError('DEBUG 40'));
        }
        if (!req.ATD["permission"].includes(permission)) {
            return next(ApiErrpr.BadRequest2('No permission'));
        }
        const id_Wait = await UserService.checkPermissionDB(req.ATD["userId"], permission);
        if (id_Wait === false) {
            return next(ApiErrpr.BadRequest2('No permission'));
        }
        next();

    }
}