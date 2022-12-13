const UserModel = require('../models/user-model');
const bcrypt = require('bcrypt')
const uuid = require('uuid');
const mailService = require('../service/mail-service');
const tokenService = require('../service/token-service');
const UserDto = require('../dtos/user-dto');
const ApiError = require('../exceptions/api-error');
const pool = require('./db-service');


class UserService {
    async registration(email, password, ip, useragent) {
        const rows = await pool.query('SELECT 1 FROM users WHERE name = ? LIMIT 1', [email]);
        if (rows.length==1) {
            console.log(rows[0])
            throw ApiError.BadRequest(`Пользователь с почтовым адресом ${email} уже существует`)
        }

        const hashPassword = await bcrypt.hash(password, 3)
       // const activationLink = uuid.v4();

        const user1 = await pool.query('INSERT INTO users (name,password) VALUES (?,?)',[email,hashPassword]);
        console.log(user1['insertId']);

        //await mailService.sendActivationMail(email,`${process.env.API_URL}/api/activate/${activationLink}`);
        //const userDto = new UserDto(user);

        const permission= [];


        const newRefreshToken = tokenService.generateRefreshToken();
        const sessionId = await tokenService.saveToken(user1['insertId'], newRefreshToken,ip,useragent);
        const newAccessToken = tokenService.generateAccessToken({userId: user1['insertId'],permission,sessionId},newRefreshToken);

        return { accessToken: newAccessToken,refreshToken: newRefreshToken} //Пересмотреть отдачу

    }

    async activate(activationLink) {
        const user = await UserModel.findOne({activationLink })
        if (!user) {
            throw ApiError.BadRequest('Некоректная ссылка')
        }
        user.isActivated = true;
        await user.save();
    }


    async login(email, password, ip, useragent) {
        //Проверка существования пользователя
        // console.time("1");
        const rows = await pool.query('SELECT user_id, password FROM users WHERE name = ? LIMIT 1', [email]);
        // console.timeEnd("1");
        // console.time("2");
        if (rows.length==0) {
            throw ApiError.BadRequest(`Пользователь с таким адресом ${email} не существует`)
        }
        // console.timeEnd("2");
        // console.time("3");
        //Проверка паролья
        const isPassEquals = await bcrypt.compare(password,rows[0].password);
        if (!isPassEquals) {
            throw ApiError.BadRequest(`Неверный пароль`)
        }
        // console.timeEnd("3");
        // console.time("4");

        // Получение прав пользователя
        const permission= []
        const perm = await pool.query('SELECT perm_name_id FROM permissions WHERE user_id = ?', [rows[0].user_id]);
        if (perm.length!=0){
            perm.forEach(element => { permission.push(element['perm_name_id']); });
        }


        //const userDto = new UserDto(user);
        //Генерация пары токенов и сохранение в БД
        const newRefreshToken = tokenService.generateRefreshToken();
        // console.timeEnd("4");
        // console.time("5");
        const sessionId = await tokenService.saveToken(rows[0].user_id, newRefreshToken,ip,useragent);
        // console.timeEnd("5");
        // console.time("6");
        const newAccessToken = tokenService.generateAccessToken({userId: rows[0].user_id,permission,sessionId},newRefreshToken);
        // console.timeEnd("6");
        return { accessToken: newAccessToken,refreshToken: newRefreshToken } //Пересмотреть отдачу
    }

    async logout(refreshToken) {
        const remove = await tokenService.removeToken(refreshToken);
        return remove;
    }

    async refresh(refreshToken, accessToken, ip, useragent) {
        //Валидация входа
        if (!refreshToken || !accessToken) {
            throw ApiError.UnauthotizedError('DEBUG 1');
        }

        //Валидация токенов
        const userData = tokenService.validateRefreshToken(accessToken,refreshToken);
        if (userData == false) {
            throw ApiError.UnauthotizedError('DEBUG 2');
        }
        //Валидация токена в БД
        let tokenFromDb = await tokenService.findToken(refreshToken);
        if (tokenFromDb.length==0) {
            throw ApiError.UnauthotizedError('DEBUG 3');
        }
        //Валидация useragent
        //Что-то странное

        // console.log(useragent,(tokenFromDb[0]['useragent']))
        // if ((tokenFromDb[0][useragent]) != useragent) {
        //     tokenService.removeTokenByID(tokenFromDb[0]['auth_id']);
        //     throw ApiError.UnauthotizedError('Wrong UA');
        // }


        const permission= []
        const perm = await pool.query('SELECT perm_name_id FROM permissions WHERE user_id = ?', [tokenFromDb[0]['user_id']]);
        if (perm.length!=0){
            perm.forEach(element => { permission.push(element['perm_name_id']); });
        }

        //Генерация новой пары токенов и сохранение в БД
        const newRefreshToken = tokenService.generateRefreshToken();
        await tokenService.updateToken(tokenFromDb[0]['auth_id'], newRefreshToken,ip );
        const newAccessToken = tokenService.generateAccessToken({userId: tokenFromDb[0]['user_id'],permission ,sessionId: tokenFromDb[0]['auth_id']},newRefreshToken);

        return { accessToken: newAccessToken,refreshToken: newRefreshToken }                           //Пересмотреть отдачу

    }

    async checkSession(auth_id) {
        const rows = await pool.query('SELECT useragent FROM sessions WHERE auth_id = ? LIMIT 1', [auth_id]);
        if (rows.length==0) {
            return false;
        }
        return true;
    }

    async getAlUsers() {
        const rows = await pool.query('SELECT user_id, name FROM users');
        delete rows.meta;
        return rows;
    }

}

module.exports = new UserService();