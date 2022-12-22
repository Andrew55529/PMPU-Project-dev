const Router = require('express').Router;
const userController = require('../controllers/user-controller');
const permController = require('../controllers/perm-controller');
const {body} = require('express-validator');

const ipuaMiddleware = require('../middlewares/ip-ua-middleware');

const AATM = require('../middlewares/accessToken/addAccessToken-middleware'); // Добавляет токен к запросу, проверяя его существования
const CATM = require('../middlewares/accessToken/checkAccessToken-middleware');
const DBATM = require('../middlewares/accessToken/checkDBAccessToken-middleware')
const PM = require('../middlewares/permission-middleware');

const router = new Router();

router.post('/registration', ipuaMiddleware,
    // body('email').isEmail(),
     body('password').isLength({min:3, max:32}),
    userController.registration);
router.post('/login', ipuaMiddleware,
    // body('email').isEmail(),
    body('password').isLength({min:3, max:32}),
    userController.login);
router.post('/logout', userController.logout);
router.get('/activate/:link', userController.activate);
router.get('/refresh',ipuaMiddleware,AATM ,userController.refresh); //Проверить надо ли еще

router.get('/logs',AATM,CATM,DBATM,PM(4), permController.getLogs);
router.get('/users',AATM,CATM,DBATM,PM(1), userController.getUsers);
router.get('/users/:userId',AATM,CATM,DBATM,PM(1), userController.getUser);
router.put('/users/:userId',AATM,CATM,DBATM,PM(1), userController.updateUser);
router.delete('/users/:userId',AATM,CATM,DBATM,PM(1), userController.deleteUser);
router.post('/users/add',body('login').isLength({min:3, max:32}),body('email').isEmail(),AATM,CATM,DBATM,PM(2), userController.addUser);

router.get('/doors',AATM,CATM,DBATM,PM(1), userController.getDoors);
router.post('/doors',AATM,CATM,DBATM,PM(3), userController.addDoors);
router.put('/doors/:doorId',AATM,CATM,DBATM,PM(3), userController.updateDoors);
router.delete('/doors/:doorId',AATM,CATM,DBATM,PM(3), userController.delDoors);


router.get('/permissions',AATM,CATM,DBATM,PM(1), userController.getPermissions);

router.get('/sessions',AATM, CATM,DBATM, userController.getSession);
router.delete('/sessions/:sessionId',AATM, CATM,DBATM, userController.delSession);

router.get('/perm/doors',AATM, CATM,DBATM,permController.getDoors);
router.post('/perm/door/:localDoorId',AATM, CATM,DBATM,permController.openDoors);

router.post('/login/github',body('code').isLength({min:15, max:25}),ipuaMiddleware,userController.loginGithub);
router.post('/connect/github',body('code').isLength({min:15, max:25}),ipuaMiddleware,AATM, CATM,DBATM,userController.connectGithub);


module.exports = router

