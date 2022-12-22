const UserModel = require('../models/user-model');
const bcrypt = require('bcrypt')
const tokenService = require('../service/token-service');
const ApiError = require('../exceptions/api-error');
const pool = require('./db-service');
const randomstring = require("randomstring");


class UserService {
    async registration(email, password, ip, useragent) {
        const rows = await pool.query('SELECT 1 FROM users WHERE name = ? LIMIT 1', [email]);
        if (rows.length===1) {
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
        const rows = await pool.query('SELECT user_id, password,github_id FROM users WHERE name = ? AND onoff = 1 LIMIT 1', [email]);
        // console.timeEnd("1");
        // console.time("2");
        if (rows.length===0) {
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
        if (perm.length!==0){
            perm.forEach(element => { permission.push(element['perm_name_id']); });
        }

        let github = false;
        if (rows[0]["github_id"]!=null) github=true;
        //const userDto = new UserDto(user);
        //Генерация пары токенов и сохранение в БД
        const newRefreshToken = tokenService.generateRefreshToken();
        // console.timeEnd("4");
        // console.time("5");
        const sessionId = await tokenService.saveToken(rows[0].user_id, newRefreshToken,ip,useragent);
        // console.timeEnd("5");
        // console.time("6");
        const newAccessToken = tokenService.generateAccessToken({userId: rows[0].user_id,permission,sessionId,github},newRefreshToken);
        // console.timeEnd("6");
        return { accessToken: newAccessToken,refreshToken: newRefreshToken } //Пересмотреть отдачу
    }

    async loginGithub(github_id, ip, useragent) {
        //Проверка существования пользователя
        const rows = await pool.query('SELECT user_id FROM users WHERE github_id = ? AND onoff = 1 LIMIT 1', [github_id]);

        if (rows.length===0) {
            throw ApiError.BadRequest(`Пользователь с таким github не существует`)
        }
        // console.timeEnd("2");
        // console.time("3");
        //Проверка паролья

        // console.timeEnd("3");
        // console.time("4");

        // Получение прав пользователя
        const permission= []
        const perm = await pool.query('SELECT perm_name_id FROM permissions WHERE user_id = ?', [rows[0].user_id]);
        if (perm.length!==0){
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
        const newAccessToken = tokenService.generateAccessToken({userId: rows[0].user_id,permission,github: true,sessionId},newRefreshToken);
        // console.timeEnd("6");
        return { accessToken: newAccessToken,refreshToken: newRefreshToken } //Пересмотреть отдачу
    }
    async connectGithub(github_id,user_id, ip, useragent) {
        //Проверка существования пользователя
        const rows = await pool.query('SELECT user_id FROM users WHERE github_id = ? LIMIT 1', [github_id]);

        if (rows.length===1) {
            const rows2 = await pool.query('UPDATE users SET github_id = NULL WHERE user_id = ?', [rows[0]["user_id"]]);
        }

        // Получение прав пользователя
        const rows2 = await pool.query('UPDATE users SET github_id = ? WHERE user_id = ?', [github_id,user_id]);


        //const userDto = new UserDto(user);
        //Генерация пары токенов и сохранение в БД
       return true;
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
        const permw = await pool.query('SELECT github_id FROM users WHERE user_id = ?',[tokenFromDb[0]['user_id']]);
        let github = false;
        if (permw[0]["github_id"]!=null) github=true;


        const permission= []
        const perm = await pool.query('SELECT perm_name_id FROM permissions WHERE user_id = ?', [tokenFromDb[0]['user_id']]);
        if (perm.length!=0){
            perm.forEach(element => { permission.push(element['perm_name_id']); });
        }

        //Генерация новой пары токенов и сохранение в БД
        const newRefreshToken = tokenService.generateRefreshToken();
        await tokenService.updateToken(tokenFromDb[0]['auth_id'], newRefreshToken,ip );
        const newAccessToken = tokenService.generateAccessToken({userId: tokenFromDb[0]['user_id'],permission ,sessionId: tokenFromDb[0]['auth_id'],github},newRefreshToken);

        return { accessToken: newAccessToken,refreshToken: newRefreshToken }                           //Пересмотреть отдачу

    }

    async checkSession(auth_id) {
        const rows = await pool.query('SELECT useragent FROM sessions WHERE auth_id = ? LIMIT 1', [auth_id]);
        if (rows.length==0) {
            return null;
        }
        console.log(rows[0]);
        return rows[0]['useragent'];
    }

    async getAlUsers() {
        const rows = await pool.query('SELECT user_id, name, onoff, email,created_by FROM users');
        delete rows.meta;
        return rows;
    }

    async deleteUser(userId) {
        const rows1 = await pool.query('DELETE FROM users WHERE user_id = ?',[userId]);
        // const rows2 = await pool.query('DELETE FROM permissions WHERE user_id = ?',[userId]);
        // const rows3 = await pool.query('DELETE FROM list  WHERE user_id = ?',[userId]);
        console.log(rows1);
        return true;
    }

    async getUser(userId) {
        const rows1 = await pool.query('SELECT user_id, name, onoff, email, created_by FROM users WHERE user_id = ?',[userId]);
        const rows2 = await pool.query('SELECT perm_name_id, gived_by FROM permissions WHERE user_id = ?',[userId]);
        const rows3 = await pool.query('SELECT doors.local_door_id, list.gived_by FROM list LEFT JOIN doors ON list.door_id = doors.door_id WHERE user_id = ?',[userId]);
        delete rows1.meta;
        delete rows2.meta;
        delete rows3.meta;
        // console.log(rows1[0]);
        // console.log(rows2);
        // console.log(rows3);
        return {user: rows1[0],permission: rows2, doors: rows3};

    }

    async updateUser(userId,userData,gived_by) {

        const rows_r = await pool.query('SELECT perm_name_id FROM permissions WHERE user_id = ?',[userId]);

        rows_r.map(perm_alone => { if (!userData.permission.includes(perm_alone["perm_name_id"])) {
            // console.log("DEL"+perm_alone["perm_name_id"]);
            pool.query('DELETE FROM permissions WHERE user_id = ? AND perm_name_id = ?',[userId,perm_alone["perm_name_id"]]);
        }    })

        userData.permission.map(perm_alone => {
            // console.log(perm_alone+"Test",rows_r.find(o => o["perm_name_id"] === perm_alone));
            if (!rows_r.find(o => o["perm_name_id"] === perm_alone)) {
                // console.log("Add"+perm_alone);
                pool.query('INSERT INTO permissions(user_id,perm_name_id,gived_by) VALUES(?,?,?)',[userId,perm_alone,gived_by]);

            }
        })




        const rows_r1 = await pool.query('SELECT doors.local_door_id, list.door_id FROM list LEFT JOIN doors ON list.door_id = doors.door_id WHERE user_id = ?',[userId]);
        console.log(rows_r1);
        rows_r1.map(lock_alone => { if (!userData.doors.includes(lock_alone["local_door_id"])) {
            // console.log("LDEL"+lock_alone["perm_name_id"]);
            pool.query('DELETE FROM list WHERE user_id = ? AND door_id = ?',[userId,lock_alone["door_id"]]);
        }    })

        userData.doors.map(lock_alone => {
            // console.log(lock_alone+"Test",rows_r1.find(o => o["local_door_id"] === lock_alone));
            if (!rows_r1.find(o => o["local_door_id"] === lock_alone)) {
                // console.log("LAdd"+lock_alone);
                pool.query('INSERT INTO list(user_id,door_id,gived_by) VALUES(?,(SELECT door_id FROM doors WHERE local_door_id = ?),?)',[userId,lock_alone,gived_by]);

            }
        })

        const rows_ra = await pool.query('SELECT name,email,onoff FROM users WHERE user_id = ?',[userId]);
        console.log(rows_ra);
        if (rows_ra[0].onoff == 1 && userData.user.onoff== 0) {
            pool.query('DELETE FROM sessions WHERE user_id = ?',[userId]);
        }
        pool.query('UPDATE users SET name= ?,email = ?,onoff= ? WHERE user_id = ?',[userData.user.name,userData.user.email,userData.user.onoff,userId]);



        // const rows1 = await pool.query('SELECT user_id, name, onoff, email, created_by FROM users WHERE user_id = ?',[userId]);
        // const rows2 = await pool.query('SELECT perm_name_id, gived_by FROM permissions WHERE user_id = ?',[userId]);
        // const rows3 = await pool.query('SELECT doors.local_door_id, list.gived_by FROM list LEFT JOIN doors ON list.door_id = doors.door_id WHERE user_id = ?',[userId]);
        // // delete rows1.meta;
        // delete rows2.meta;
        // delete rows3.meta;
        // console.log(rows1[0]);
        // console.log(rows2);
        // console.log(rows3);
        return true;
        // return {user: rows1[0],permission: rows2, doors: rows3};

    }



    async checkUser(login) {
        const rows = await pool.query('SELECT 1 FROM users WHERE name= ?',[login]);
        if (rows.length==0) return false;
        return true;
    }

    async addUser(email,login,user_id_who) {
        const password = randomstring.generate(8);
        const hashPassword = await bcrypt.hash(password, 3)
        // const activationLink = uuid.v4();
        const rows = await pool.query('INSERT INTO users (name,email,password,created_by) VALUES (?,?,?,?)', [login,email,hashPassword,user_id_who]);

        return password;
    }

    async getSessions(userId) {
        const rows = await pool.query('SELECT auth_id,ip,useragent,last_action,first_enter FROM sessions WHERE user_id = ?',[userId]);
        delete rows.meta;
        return rows;
    }

    async getDoors() {
        const rows = await pool.query('SELECT door_id,local_door_id, name FROM doors');
        delete rows.meta;
        return rows;
    }

    async addDoors(name,localDoorId) {
        const rows1 = await pool.query('SELECT door_id FROM doors WHERE local_door_id = ?', [localDoorId]);
        console.log(rows1);
        if (rows1.length) return false;
        const rows = await pool.query('INSERT INTO doors (local_door_id,name) VALUES (?,?)', [localDoorId,name]);
        return true;
    }

    async delDoors(doorId) {
        const rows = await pool.query('DELETE FROM doors WHERE door_id=?', [doorId]);
        console.log(rows)
        return true;
    }
    async updateDoors(doorId,name,localDoorId) {
        const rows1 = await pool.query('SELECT door_id FROM doors WHERE local_door_id = ?', [localDoorId]);
        console.log(rows1);
        if (rows1.length)
            if (rows1[0]["door_id"]!=doorId)return false;

        const rows = await pool.query('UPDATE doors SET name= ?,local_door_id = ? WHERE door_id=?', [name,localDoorId,doorId]);
        console.log(rows)
        return true;
    }





    async getPermissions() {
        const rows = await pool.query('SELECT perm_name_id, name FROM permissions_name');
        delete rows.meta;
        return rows;
    }





    async delSessions(userId, sessionId) {
        const rows = await pool.query('DELETE FROM sessions WHERE user_id = ? and auth_id=?',[userId,sessionId]);
        return rows["affectedRows"] == 1;

    }

    async getPermissionDB(user_id) {
        const rows = await pool.query('SELECT perm_name_id FROM permissions WHERE user_id = ?',[user_id]);
        const permission=[]
        if (rows.length!=0){
            rows.forEach(element => { permission.push(element['perm_name_id']); });
        }
        console.log(permission);
        return permission
    }

    async checkPermissionDB(user_id, permission) {

        const rows = await pool.query('SELECT perm_name_id FROM permissions WHERE user_id = ? AND perm_name_id = ?',[user_id,permission]);
        return rows.length != 0;

    }

}

module.exports = new UserService();