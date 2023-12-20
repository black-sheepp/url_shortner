const router = require("express").Router();

const homeController = require('../Controller/home')
const userController = require('../Controller/user')

router.get('/', homeController.home);
router.post('/sign-up', userController.signUp);

module.exports = router;