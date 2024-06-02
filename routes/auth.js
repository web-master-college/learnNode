const express = require('express');
const router = express.Router();
const AuthConroller = require('../controllers/Auth');


router.get('/login', AuthConroller.login);

router.get('/logout', AuthConroller.logout);

router.post('/login', AuthConroller.login);

router.post('/register', AuthConroller.registerUser);

router.get('/register', AuthConroller.registerUser);

router.use(AuthConroller.verifyLoginAccess);

module.exports = router;