const { Router } = require('express');
const CartController = require('./cart.controller');
const { requireAuth } = require('../../../middleware/auth');
const router = Router();
// Lấy giỏ hàng
router.get('/', requireAuth, CartController.getCart);

// Thêm sản phẩm vào giỏ
router.post('/add/:productId', requireAuth, CartController.addToCart);

// Xóa sản phẩm khỏi giỏ
router.delete('/remove/:productId', requireAuth, CartController.removeFromCart);
module.exports = router;
