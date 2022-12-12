const permService = require('../service/perm-service');
const UserService = require('../service/user-service');
const {validationResult} = require('express-validator');
const ApiError = require('../exceptions/api-error');


class PermController {
    async getDoors(req, res, next) {
        try {
            // Check session
            const test= await UserService.checkSession(req.accessTokenData['sessionId']);
            if (test === false) {
                throw ApiError.UnauthotizedError('DEBUG 21');
            }

            const userData =await permService.getDoors(147);


            return res.json(userData);

        } catch (e) {
            next(e)
        }
    }


}

module.exports = new PermController();