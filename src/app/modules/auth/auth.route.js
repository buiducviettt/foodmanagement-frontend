const { Router } = require('express');
const AuthController = require('./auth.controller');

const router = Router();
router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
module.exports = router;
