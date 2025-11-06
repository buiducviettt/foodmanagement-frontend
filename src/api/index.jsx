import axios from 'axios';

const api = axios.create({
  baseURL: 'https://673c683296b8dcd5f3f9d8d8.mockapi.io/food/data/',
  headers: {
    'Content-Type': 'application/json',
  },
});

// gọi list sản phẩm
export const getProducts = async () => {
  try {
    const response = await api.get('/courses');
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};
export const updatedStock = async (id, stock) => {
  try {
    const response = await api.get(`/courses/${id}`);
    const currentProduct = response.data;
    const newStock = Math.max(currentProduct.stock - stock, 0);
    // gửi request nhập tồn kho
    await api.put(`/courses/${id}`, {
      stock: newStock,
    });
  } catch (error) {
    console.error('Error updating stock:', error);
  }
};
