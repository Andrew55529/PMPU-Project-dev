const permService = require('../service/perm-service');
const UserService = require('../service/user-service');
const {validationResult} = require('express-validator');
const ApiError = require('../exceptions/api-error');
const pool = require("../service/db-service");


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

    async openDoors(req, res, next) {
        try {
            // Check session
            //Перенести отсюда
            const rows2 = await pool.query('INSERT INTO logs (user_id,action,object) VALUES(?,1,?)', [req['accessTokenData']['userId'],req.params['localDoorId']]);
            console.log(rows2);
            return res.json("123");
        } catch (e) {
            next(e)
        }
    }


}

module.exports = new PermController();