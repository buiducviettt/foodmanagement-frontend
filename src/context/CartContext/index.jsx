/* eslint-disable react/prop-types */
import { createContext, useState, useContext, useEffect } from 'react';

// Tạo CartContext
const CartContext = createContext();

// Provider cho CartContext
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [dailyRevenue, setDailyRevenue] = useState(0);
  useEffect(() => {
    const calculateTotalPrice = () => {
      const total = cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0,
      );
      setTotalPrice(total.toFixed(2));
    };
    calculateTotalPrice();
  }, [cartItems]);

  // Hàm thêm sản phẩm vào giỏ hàng
  const addToCart = (item) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (cartItem) => cartItem.id === item.id,
      );

      if (existingItem) {
        // Nếu sản phẩm đã tồn tại, tăng số lượng
        return prevItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem,
        );
      } else {
        // Nếu sản phẩm chưa tồn tại, thêm vào với số lượng ban đầu là 1
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
  };
  // Hàm xóa sản phẩm khỏi giỏ hàng
  const removeFromCart = (itemId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  // Hàm kiểm tra số lượng sản phẩm trong giỏ
  const getCartCount = () => cartItems.length;
  // Kiểm tra và reset daily revenue mỗi ngày
  useEffect(() => {
    const today = new Date().toDateString();
    console.log(today);
    const lastReset = localStorage.getItem('lastReset');
    if (lastReset !== today) {
      setDailyRevenue(0);
      localStorage.setItem('dailyRevenue', 0);
      localStorage.setItem('lastReset', today);
    } else {
      setDailyRevenue(parseFloat(localStorage.getItem('dailyRevenue')) || 0);
    }

    // Kiểm tra và lấy totalRevenue từ localStorage
    const storedTotalRevenue = parseFloat(localStorage.getItem('totalRevenue'));
    setTotalRevenue(isNaN(storedTotalRevenue) ? 0 : storedTotalRevenue);
  }, []);

  // Hàm thêm doanh thu khi thanh toán
  const addToRevenue = () => {
    const newDailyRevenue = dailyRevenue + parseFloat(totalPrice);
    const newTotalRevenue = totalRevenue + parseFloat(totalPrice);

    setDailyRevenue(newDailyRevenue);
    setTotalRevenue(newTotalRevenue);

    // Lưu vào localStorage để giữ dữ liệu sau khi tải lại trang
    localStorage.setItem('dailyRevenue', newDailyRevenue);
    localStorage.setItem('totalRevenue', newTotalRevenue); // FIX: Đảm bảo lưu đúng totalRevenue
  };
  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        addToRevenue,
        removeFromCart,
        dailyRevenue,
        totalRevenue,
        getCartCount,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Hook để sử dụng CartContext
export const useCart = () => {
  return useContext(CartContext);
};
