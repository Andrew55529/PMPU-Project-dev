const userService = require('../service/user-service');
const {validationResult} = require('express-validator');
const ApiError = require('../exceptions/api-error');
const {Octokit} = require("octokit");
const axios = require("axios");

//const geoip = require('geoip-lite');

class UserController {
    async registration(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Ошибка при валидации', errors.array()))
            }
            const {email, password} = req.body;
            const userData = await userService.registration(email,password,req.ip2,req.ua);
            console.log(userData);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30*24*60*60*1000, httpOnly: true})
            return res.json(userData);

        } catch (e) {
            next(e)
        }
    }

    async login(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Ошибка при валидации', errors.array()))
            }
            const {email, password} = req.body;
            console.log(email,password);
            const userData = await userService.login(email,password,req.ip2,req.ua);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30*24*60*60*1000, httpOnly: false})
            return res.json(userData);
        } catch (e) {
            next(e)
        }
    }

    async logout(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const remove = await userService.logout(refreshToken);
            res.clearCookie(`refreshToken`)
            return res.json({remove})
        } catch (e) {
            next(e)
        }
    }

    async activate(req, res, next) {
        try {
            const activationLink = req.params.link;
            await userService.activate(activationLink);
            return res.redirect(process.env.CLIENT_URL)
        } catch (e) {
            next(e)
        }
    }

    async refresh(req, res, next) {


        try {
            const {refreshToken} = req.cookies;
            const userData = await userService.refresh(refreshToken,req.AT,req.ip2,req.ua);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30*24*60*60*1000, httpOnly: true})
            return res.json(userData);
        } catch (e) {
            next(e)
        }
    }

    async getUsers(req, res, next) {
        try {
            const users = await userService.getAlUsers();
            return res.json(users);
            res.json(['123','456']);
        } catch (e) {
            next(e)
        }
    }
    
    async getSession(req,res,next) {
        try {
            console.log(req.ATD["userId"]);
            const users = await userService.getSessions(req.ATD["userId"]);
            return res.json(users);
        } catch (e) {
            console.log(e);
            next(e);
        }
        
        
    }

    async delSession(req,res,next) {
        const sessionId = req.params.sessionId;
        if (!sessionId){
            console.log("ERE")
            return next(e);
        }

        try {
            console.log(req.ATD["userId"]);
            const users = await userService.delSessions(req.ATD["userId"],sessionId);
            return res.json(users);
        } catch (e) {
            console.log(e);
            next(e);
        }


    }


    async loginGithub(req,res,next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Ошибка при валидации', errors.array()))
            }
            const {code} = req.body;
            console.log(code);

            const clientId = "d63b9e565cbef096b283";
            const clientSecret = "e02622ff4ad75c37693f26a1e44785e44fa6b52b";

            const config = {
                params: {
                    client_id: clientId,
                    client_secret: clientSecret,
                    code: code
                },
                headers: {
                    'Accept': "application/vnd.github+json"
                }
            };

            const githubUrl = "https://github.com/login/oauth/access_token";

            const ass= await axios.post(githubUrl, null, config).then((res) => res.data);
            console.log(ass);
            const octokit = new Octokit({
                auth: ass["access_token"]
            });
            const assa= await octokit.request("GET /user", {});

            console.log(assa["data"]["id"]);
            if (assa["data"]["id"]) {
                const userData = await userService.loginGithub(assa["data"]["id"],req.ip2,req.ua);
                res.cookie('refreshToken', userData.refreshToken, {maxAge: 30*24*60*60*1000, httpOnly: false})
                return res.json(userData);
            } else
                throw ApiError.UnauthotizedError('DEBUG 111');
            // const userData = await userService.login(email,password,req.ip2,req.ua);
            // res.cookie('refreshToken', userData.refreshToken, {maxAge: 30*24*60*60*1000, httpOnly: false})
            // return res.json(userData);
        } catch (e) {
            next(e)
        }

    }

}

module.exports = new UserController();