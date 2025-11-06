const { Router } = require('express');
const UserController = require('./user.controller');
const { requireAuth } = require('../../../middleware/auth');
const router = Router();
router.get('/me', requireAuth, UserController.me);
module.exports = router;
