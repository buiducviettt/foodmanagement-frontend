const prisma = require('../../../lib/prisma');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
//  đăng ký tài khoản
async function register({ username, email, password, name }) {
  const exists = await prisma.user.findUnique({
    where: { email: email },
  });
  if (exists) {
    throw new Error('Email đã tồn tại trong hệ thống');
  }
  // else
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { username, email, passwordHash: hashedPassword, name, role: 'user' },
    select: { id: true, username: true, email: true, name: true, role: true },
  });
  return user;
}
async function login({ email, password }) {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      throw new Error('Email hoặc mật khẩu không đúng');
    }
    // check password
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      throw new Error('Email hoặc mật khẩu không đúng');
    }
    // create token khi đăng nhập thành công
    const token = jwt.sign(
      {
        sub: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: '7d' },
    );
    return {
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    };
  } catch (error) {
    throw new Error(error.message);
  }
}
//export
module.exports = { register, login };
