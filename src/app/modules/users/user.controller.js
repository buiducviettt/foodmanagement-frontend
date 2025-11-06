const service = require('./user.service');
// lấy thông tin user hiện tại
async function me(req, res) {
  try {
    const user = await service.me(req.user.sub); // sub = user.id trong token
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}
module.exports = {
  me,
};
