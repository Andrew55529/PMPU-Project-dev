const ApiErrpr = require('../../exceptions/api-error');
const userService = require('../../service/user-service');

module.exports = async function (req, res, next) {
    try {
        //Сходить в базу проверить сессию
        const session = await userService.checkSession(req.ATD['sessionId'])
        console.log(session);
        if (session === null) {
            return next(ApiErrpr.UnauthotizedError('DEBUG DBACM'));
        }
        //Вставить проверку useragent
        next();
    } catch (e) {
        return next(ApiErrpr.UnauthotizedError());
    }

}