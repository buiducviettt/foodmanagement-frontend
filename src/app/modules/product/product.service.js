const prisma = require('../../../lib/prisma');
async function getAll() {
  return prisma.product.findMany();
}
async function getById(id) {
  return prisma.product.findUnique({ where: { id: Number(id) } });
}
module.exports = { getAll, getById };
