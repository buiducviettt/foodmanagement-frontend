/* eslint-disable react/prop-types */
import { createContext, useState, useContext, useEffect } from 'react';
import { getCart, addToCart, removeFromCart } from '../../api';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [], total: 0 });
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [dailyRevenue, setDailyRevenue] = useState(0);

  // 🧠 Lấy giỏ hàng từ server khi load trang
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const data = await getCart();
        setCart(data); // ✔ FE KHÔNG TÍNH GÌ CẢ
        console.log('🛒 Cart data:', data);
      } catch (err) {
        console.error('Error fetching cart:', err);
      }
    };
    fetchCart();
  }, []);

  // ➕ Thêm sản phẩm vào giỏ
  const handleAdd = async (productId) => {
    try {
      const updatedCart = await addToCart(productId);
      setCart(updatedCart);
      return { success: true, cart: updatedCart };
    } catch (err) {
      return { success: false, cart }; // GIỮ CART CŨ
    }
  };

  // ❌ Xóa sản phẩm khỏi giỏ
  const handleRemove = async (productId) => {
    try {
      const updatedCart = await removeFromCart(productId);
      setCart(updatedCart);
    } catch (err) {
      console.error('Error removing from cart:', err);
    }
  };

  // 💵 Cộng doanh thu khi thanh toán (tùy chọn)
  const addToRevenue = () => {
    const newDailyRevenue = dailyRevenue + cart.total;
    const newTotalRevenue = totalRevenue + cart.total;

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
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
