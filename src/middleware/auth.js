import jwt from 'jsonwebtoken';

export function requireAuth(req, res, next) {
  const header = req.headers['authorization'];
  if (!header) {
    return res.status(401).json({ message: 'Missing Authorization header' });
  }

  const token = header.replace('Bearer ', '');

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload; // { sub, email, role }
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
}
