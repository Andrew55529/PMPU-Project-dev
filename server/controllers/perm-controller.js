const permService = require('../service/perm-service');
const UserService = require('../service/user-service');
const {validationResult} = require('express-validator');
const ApiError = require('../exceptions/api-error');
const {json} = require("express");


class PermController {
    async getDoors(req, res, next) {
        try {
            // Check session
            const test= await UserService.checkSession(req.accessTokenData['sessionId']);
            if (test === false) {
                throw ApiError.UnauthotizedError('DEBUG 21');
            }
            console.log("|||",req.accessTokenData['userId']);
            const userData =await permService.getDoors(req.accessTokenData['userId']);

            console.log("userData",userData['rows']);
            return res.json(userData['rows']);

        } catch (e) {
            next(e)
        }
    }


}

module.exports = new PermController();