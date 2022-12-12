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

        // const tokens = tokenService.generateToken({test: 123});
        // await tokenService.saveToken(user1['insertId'], tokens.refreshToken, ip, useragent);
        // return { ...tokens, user: "123" }


        const newRefreshToken = tokenService.generateRefreshToken();
        const sessionId = await tokenService.saveToken(user1['insertId'], newRefreshToken,ip,useragent);
        const newAccessToken = tokenService.generateAccessToken({test: 123,sessionId},newRefreshToken);

        return { accessToken: newAccessToken,refreshToken: newRefreshToken, user: user1['insertId'] } //Пересмотреть отдачу

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
        const rows = await pool.query('SELECT user_id, password FROM users WHERE name = ? LIMIT 1', [email]);
        if (rows.length==0) {
            throw ApiError.BadRequest(`Пользователь с таким адресом ${email} не существует`)
        }
        //Проверка паролья
        const isPassEquals = await bcrypt.compare(password,rows[0].password);
        if (!isPassEquals) {
            throw ApiError.BadRequest(`Неверный пароль`)
        }


        //const userDto = new UserDto(user);
        //Генерация пары токенов и сохранение в БД
        const newRefreshToken = tokenService.generateRefreshToken();
        const sessionId = await tokenService.saveToken(rows[0].user_id, newRefreshToken,ip,useragent);
        const newAccessToken = tokenService.generateAccessToken({test: 123,sessionId},newRefreshToken);

        return { accessToken: newAccessToken,refreshToken: newRefreshToken, user: rows[0].user_id } //Пересмотреть отдачу
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

      //  const user = await UserModel.findById(userData.id);
      //  const userDto = new UserDto(user);

        //Генерация новой пары токенов и сохранение в БД
        const newRefreshToken = tokenService.generateRefreshToken();
        await tokenService.updateToken(tokenFromDb[0]['auth_id'], newRefreshToken,ip );
        const newAccessToken = tokenService.generateAccessToken({test: 123,sessionId: tokenFromDb[0]['auth_id']},newRefreshToken);

        return { accessToken: newAccessToken,refreshToken: newRefreshToken, user: "123" }                           //Пересмотреть отдачу

    }

    async checkSession(auth_id) {
        const rows = await pool.query('SELECT useragent FROM auth WHERE auth_id = ? LIMIT 1', [auth_id]);
        if (rows.length==0) {
            return false;
        }
        return true;
    }

    async getAlUsers() {
        const users = await UserModel.find();
        return users;
    }

}

module.exports = new UserService();