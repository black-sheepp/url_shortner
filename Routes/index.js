const router = require("express").Router();
const homeController = require('../Controller/home')
const userController = require('../Controller/user')
const urlController = require('../Controller/url')
const verifyToken = require("../Config/jwt_middleware")

router.get('/', homeController.home);
router.post('/sign-up', userController.signUp);
router.post('/sign-in', userController.signIn);
router.post('/shorten', verifyToken, urlController.createUrl);
router.get('/:shortURL', verifyToken,urlController.redirectToOriginalUrl);


module.exports = router;