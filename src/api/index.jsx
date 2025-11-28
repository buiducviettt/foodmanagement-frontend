import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
// đăng nhập user
export const login = async (email, password) => {
  try {
    const res = await api.post('/auth/login', { email, password });
    localStorage.setItem('token', res.data.token);
    return res.data;
  } catch (e) {
    console.error(' Error logging in:', e);
  }
};
// đăng ký
export const register = async (username, email, password, name) => {
  const res = await api.post('/auth/register', {
    username,
    email,
    password,
  });
  return res.data;
};
// gọi list sản phẩm
export const getProducts = async () => {
  try {
    const response = await api.get('/products');
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};
// add to cart

export const getCart = async () => {
  try {
    const res = await api.get('/cart');
    console.log('User cart ', res.data);
    return res.data;
  } catch (error) {
    console.error(' Error while get all cart ', error);
  }
};
// add to cart
export const addToCart = async (productId) => {
  try {
    const res = await api.post(`cart/add/${productId}`);
    console.log('Cart added', res.data);
    return res.data;
  } catch (e) {
    console.error(' Error while add to cart ', e);
  }
};
//remove cart
export const removeFromCart = async (productId) => {
  try {
    const res = await api.delete(`cart/remove/${productId}`);
    console.log('Cart have been removed ', res.data);
    return res.data;
  } catch (e) {
    console.error('Error while remove cart', e);
  }
};
export const updatedStock = async (id, stock) => {
  try {
    const response = await api.get(`/products/${id}`);
    const currentProduct = response.data;
    const newStock = Math.max(currentProduct.stock - stock, 0);
    // gửi request nhập tồn kho
    await api.put(`/products/${id}`, {
      stock: newStock,
    });
  } catch (error) {
    console.error('Error updating stock:', error);
  }
};
export const createOrders = async (cart, customer, type) => {
  try {
    const res = await api.post('/orders', { cart, customer, type });
    return res.data;
  } catch (err) {
    console.error('Create order failed:', err);
    throw err;
  }
};

export const getOrders = async () => {
  const res = await api.get('/orders');
  return res.data;
};
export const getDashboardStats = async () => {
  const res = await api.get('/dashboard/stats');
  return res.data;
};
export const getTopDishesAPI = async () => {
  const res = await api.get('/dashboard/top-dishes');
  return res.data;
};
export const getOrderTypesAPI = async () => {
  const res = await api.get('/dashboard/order-types');
  return res.data;
};
export default api;
