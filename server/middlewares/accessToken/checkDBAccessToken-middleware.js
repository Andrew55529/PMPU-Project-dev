const ApiErrpr = require('../../exceptions/api-error');
const userService = require('../../service/user-service');

module.exports = function (req, res, next) {
    try {
        //Сходить в базу проверить сессию
        const session= userService.checkSession(req.ATD['sessionId'])
        if (session === null) {
            return next(ApiErrpr.UnauthotizedError('DEBUG DBACM'));
        }
        //Вставить проверку useragent
        next();
    } catch (e) {
        return next(ApiErrpr.UnauthotizedError());
    }

}