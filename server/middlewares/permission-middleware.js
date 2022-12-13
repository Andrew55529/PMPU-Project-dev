const ApiErrpr = require('../exceptions/api-error');
const UserService = require('../service/user-service');

module.exports = function(permission) {
    return function(req, res, next) {
        // Проверка req.accessTokenData["permission"]
        console.log("Perm0");

        if (!req.ATD["permission"]) {
            return next(ApiErrpr.UnauthotizedError('DEBUG 40'));
        }
        console.log("Perm1");
        if (!req.ATD["permission"].includes(permission)) {
            return next(ApiErrpr.UnauthotizedError('DEBUG 41'));
        }
        console.log("Perm2");
        if (UserService.checkPermissionDB(req.ATD["userId"],permission)===false) {
            return next(ApiErrpr.UnauthotizedError('DEBUG 42'));
        }
        console.log("Perm3");
        next();

        // } catch (e) {
        //     return next(ApiErrpr.UnauthotizedError());
        // }
    }
}