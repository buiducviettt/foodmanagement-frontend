const authRoutes = require('../app/modules/auth/auth.route');
const userRoutes = require('../app/modules/users/user.route');
const cartRoutes = require('../app/modules/cart/cart.route');
const productRoutes = require('../app/modules/product/product.route');
module.exports = (app) => {
  app.use('/auth', authRoutes);
  app.use('/users', userRoutes);
  app.use('/cart', cartRoutes);
  app.use('/products', productRoutes);
};
