const service = require('./product.service');
async function getAll(req, res) {
  try {
    const products = await service.getAll();
    return res.json(products);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
}
async function getById(req, res) {
  try {
    const product = await service.getById(req.params.id);
    return res.json(product);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
}
module.exports = { getAll, getById };
