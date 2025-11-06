const prisma = require('../../../lib/prisma');
async function getCart(userId) {
  return prisma.cart.findUnique({
    where: { userId },
    include: {
      cartItems: {
        include: {
          product: true,
        },
      },
    },
  });
}
async function addToCart(userId, productId, quantity = 1) {
  // lây sản phẩm
  const product = await prisma.product.findUnique({ where: { id: productId } });
  if (!product) throw new Error('Product not found');
  if (product.stock < quantity) throw new Error('Out of stock');
  // kiểm tra có giỏ hàng chưa
  // nếu có
  let cart = await prisma.cart.findUnique({ where: { userId } });
  // nêu không
  if (!cart) cart = await prisma.cart.create({ data: { userId } });
  // kiểm tra sản phẩm có trong giỏ chưa
  const existingItem = await prisma.cartItem.findFirst({
    where: { cartId: cart.id, productId },
  });
  if (existingItem) {
    await prisma.cartItem.update({
      where: { id: existingItem.id },
      data: { quantity: existingItem.quantity + quantity },
    });
  } else {
    await prisma.cartItem.create({
      data: { cartId: cart.id, productId, quantity },
    });
  }
  // giảm stock
  await prisma.product.update({
    where: { id: productId },
    data: { stock: product.stock - quantity },
  });
  return { message: 'Product added to cart', cart };
}

async function removeFromCart(userId, productId) {
  const cart = await prisma.cart.findUnique({ where: { userId } });
  if (!cart) return null;
  await prisma.cartItem.deleteMany({
    where: { cartId: cart.id, productId },
  });
  return prisma.cart.findUnique({
    where: { id: cart.id },
    include: { items: { include: { product: true } } },
  });
}

module.exports = { getCart, removeFromCart, addToCart };
