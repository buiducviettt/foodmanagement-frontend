const service = require('./cart.service');
async function getCart(req, res) {
  const userId = req.user.id;
  const cart = await service.getCart(userId);
  return res.json(cart);
}
// create cart
async function addToCart(req, res) {
  try {
    const cart = await service.addToCart(
      req.user.id,
      Number(req.params.productId),
    );
    res.json(cart);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

async function removeFromCart(req, res) {
  try {
    const cart = await service.removeFromCart(
      req.user.id,
      Number(req.params.productId),
    );
    res.json(cart);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = { getCart, addToCart, removeFromCart };
