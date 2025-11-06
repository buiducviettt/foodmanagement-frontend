const express = require('express');
const router = express.Router();
const controller = require('./product.controller');
// định nghĩa routes
router.get('/', controller.getAll);
router.get('/:id', controller.getById);
module.exports = router;
