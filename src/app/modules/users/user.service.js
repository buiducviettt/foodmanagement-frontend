const prisma = require('../../../lib/prisma');
async function me(userId) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) return null;

  // Xóa password trước khi trả về FE
  const { password, ...safeUser } = user;
  return safeUser;
}
module.exports = { me };
