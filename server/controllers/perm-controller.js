const permService = require('../service/perm-service');
const UserService = require('../service/user-service');
const {validationResult} = require('express-validator');
const ApiError = require('../exceptions/api-error');
const pool = require("../service/db-service");


class PermController {
    async getDoors(req, res, next) {
        try {
            // Check session

            console.log("|||",req.ATD['userId']);
            const userData =await permService.getDoors(req.ATD['userId']);

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

    async getLogs(req, res, next) {
        try {
            //Перенести отсюда
            const rows2 = await pool.query('SELECT user_id,action,object,time FROM logs');
            console.log(rows2);
            delete rows2.meta;
            return res.json(rows2);
        } catch (e) {
            next(e)
        }
    }

}

module.exports = new PermController();