const jwt = require('jsonwebtoken');
const tokenModel= require('../models/token-model');
const pool = require('./db-service');
const randomstring = require("randomstring");

class TokenService {
    generateToken(payload) {
        const refreshToken = this.generateRefreshToken();
        const accessToken = this.generateAccessToken(payload,refreshToken);
        // const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '1h'})
        // const refreshToken =accessToken.split('.')[2].slice(-16)+"."+randomstring.generate(48);  // Создаем refresh токен на основе access токене и вновь сгенерированной строки
        return { accessToken, refreshToken }
    }

    generateRefreshToken() {
        return randomstring.generate(48);
    }
    generateAccessToken(payload,refreshToken) {
        payload.key=refreshToken.slice(-16)
        console.log("payload",payload);
        console.log(typeof payload);
        return jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '1h'})
    }

    validateAccessToken(token,exp=false) {
        try {
            const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET, {ignoreExpiration: exp});
            return userData;
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    validateRefreshToken(accessToken, refreshToken) {
        //Проверяем верный ли у нас access токен
        const validTest = this.validateAccessToken(accessToken,true)
        if (validTest == null) {
          return false;
        }
        //Если верный, то проверяем refresh token
        if (refreshToken.slice(-16) == validTest['key']) {
            return true;
        }
        return false;
    }

    async saveToken(userId, refreshToken, ip, userAgent) {  // Дописать проверку раз в время удаление старых сессий
        const rows1 = await pool.query('SELECT auth_id FROM sessions WHERE user_id = ? ORDER BY expired_in ASC LIMIT 6', [userId]);
        if (rows1.length>=5) {
            console.log("Много авторизаций, удаляем самую старую");
            const rows2 = await pool.query('DELETE FROM sessions WHERE auth_id = ?', [rows1[0]['auth_id']]);
        }
        const rows2 = await pool.query('INSERT INTO sessions (user_id,ip,useragent,refresh_token,expired_in) VALUES(?,?,?,?,CURRENT_TIMESTAMP(0) + interval \'7\' day)', [userId,ip,userAgent,refreshToken]);

        return Number(rows2['insertId']);
    }

    async updateToken(authId, refreshToken, ip) {
        const rows2 = await pool.query('UPDATE sessions SET refresh_token= ?, ip = ?, last_action = CURRENT_TIMESTAMP(0), expired_in = CURRENT_TIMESTAMP(0) + interval \'7\' day WHERE auth_id = ?', [refreshToken,ip,authId]);
        if (rows2['affectedRows']==1) {
            return true;
        }
        return false;
    }

    async removeToken(refreshToken) {  //Удаление
        const rows2 = await pool.query('DELETE FROM sessions WHERE refresh_token = ?', [refreshToken]);
        if (rows2['affectedRows']==1) {
            return true;
        }
        return false;
    }
    async removeTokenByID (auth_id) {  //Удаление
        const rows2 = await pool.query('DELETE FROM sessions WHERE auth_id = ?', [auth_id]);
        if (rows2['affectedRows']==1) {
            return true;
        }
        return false;
    }

    async findToken(refreshToken) {
        const rows1 = await pool.query('SELECT auth_id,useragent,user_id FROM sessions WHERE refresh_token = ? LIMIT 1', [refreshToken]);
        return rows1;
    }

}

module.exports = new TokenService();