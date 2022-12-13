const Router = require('express').Router;
const userController = require('../controllers/user-controller');
const permController = require('../controllers/perm-controller');
const {body} = require('express-validator');
const authMiffleware = require('../middlewares/auth-middleware')
const ipuaMiddleware = require('../middlewares/ip-ua-middleware');
const addAccessTokenMiddleware = require('../middlewares/addAccessToken-middleware');
const addAccessTokenDataMiddleware = require('../middlewares/addAccessTokenData-middleware');

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
router.get('/refresh',ipuaMiddleware,addAccessTokenMiddleware ,userController.refresh);


router.get('/users',addAccessTokenMiddleware, authMiffleware, userController.getUsers);

router.get('/perm/doors',addAccessTokenMiddleware , addAccessTokenDataMiddleware,permController.getDoors);
router.post('/perm/door/:localDoorId',addAccessTokenMiddleware , addAccessTokenDataMiddleware,permController.openDoors);


module.exports = router

