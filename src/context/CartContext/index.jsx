/* eslint-disable react/prop-types */
import { createContext, useState, useContext, useEffect } from 'react';
import { getCart, addToCart, removeCart } from '../../api';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [dailyRevenue, setDailyRevenue] = useState(0);

  // 🧠 Lấy giỏ hàng từ server khi load trang
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const data = await getCart();
        setCart(data?.items || []); // ✅ phải có dấu ()
        console.log('🛒 Cart data:', data);
      } catch (err) {
        console.error('Error fetching cart:', err);
      }
    };
    fetchCart();
  }, []);

  // 💰 Tính tổng tiền mỗi khi cart thay đổi
  useEffect(() => {
    const total = cart.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0,
    );
    setTotalPrice(total.toFixed(2));
  }, [cart]);

  // ➕ Thêm sản phẩm vào giỏ
  const handleAdd = async (productId) => {
    try {
      const updatedCart = await addToCart(productId);
      setCart(updatedCart.items); // ✅ luôn đồng bộ với DB
    } catch (err) {
      console.error('Error while add to cart:', err);
    }
  };

  // ❌ Xóa sản phẩm khỏi giỏ
  const handleRemove = async (productId) => {
    try {
      const updatedCart = await removeFromCart(productId);
      setCart(updatedCart.items);
    } catch (err) {
      console.error('Error removing from cart:', err);
    }
  };

  // 💵 Cộng doanh thu khi thanh toán
  const addToRevenue = () => {
    const newDailyRevenue = dailyRevenue + parseFloat(totalPrice);
    const newTotalRevenue = totalRevenue + parseFloat(totalPrice);

    setDailyRevenue(newDailyRevenue);
    setTotalRevenue(newTotalRevenue);

    localStorage.setItem('dailyRevenue', newDailyRevenue);
    localStorage.setItem('totalRevenue', newTotalRevenue);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        handleAdd,
        handleRemove,
        addToRevenue,
        dailyRevenue,
        totalRevenue,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
