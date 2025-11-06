const service = require('./auth.service');
// xử lý register
async function register(req, res) {
  try {
    const user = await service.register(req.body);
    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
// xử lý login
async function login(req, res) {
  try {
    console.log('Login body:', req.body);
    const user = await service.login(req.body);
    return res.status(200).json(user);
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: error.message });
  }
}
module.exports = {
  register,
  login,
};
