/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from 'react';
import { updatedStock } from '../../api';
export const OrderContext = createContext();
export const OrderProvider = ({ children }) => {
  const storedOrders = JSON.parse(localStorage.getItem('orders')) || [];
  const [orders, setOrders] = useState(storedOrders);
  // khi orders thêm thì lưu vô local
  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);
  // random trạng thái
  const getRandomStatus = () => {
    const statuses = ['pending', 'complete', 'preparing'];
    return statuses[Math.floor(Math.random() * statuses.length)];
  };
  // thêm đơn hàng mới
  const createNewOrder = async (
    cartItems,
    cardholderName,
    orderType,
    totalPrice,
  ) => {
    const newOrder = {
      id: Date.now(),
      type: orderType,
      customer: cardholderName,
      items: cartItems,
      total: totalPrice,
      date: new Date().toDateString(),
      status: getRandomStatus(),
    };
    // trừ tồn kho
    for (const item of cartItems) {
      await updatedStock(item.id, item.quantity || 1); // Gọi hàm cập nhật tồn kho
    }
    // Thêm vào danh sách đơn hàng
    setOrders((prevOrders) => {
      const updatedOrders = [...prevOrders, newOrder];
      localStorage.setItem('orders', JSON.stringify(updatedOrders));
      return updatedOrders;
    });
    return newOrder; // Trả về đơn hàng vừa tạo
  };
  // Lấy tổng số đơn hàng
  const getTotalOrders = () => orders.length;
  const countUniqueCustomers = () => {
    const names = orders.map((order) => order.customer);
    const uniqueNames = new Set(names); // Sử dụng Set để loại bỏ trùng lặp
    return uniqueNames.size; // Trả về số lượng khách hàng duy nhất
  };
  // Xóa toàn bộ đơn hàng
  const clearOrders = () => {
    localStorage.removeItem('orders');
    setOrders([]); // Cập nhật lại state
  };
  // ranking món ăn
  const getTopDishes = (orders) => {
    console.log('Orders received in getTopDishes:', orders); // Kiểm tra orders
    const dishCounts = orders.reduce((acc, order) => {
      if (Array.isArray(order.items)) {
        // Kiểm tra nếu order.items là một mảng
        order.items.forEach((item) => {
          console.log('Item name:', item.title);
          const name = item.title;
          const quantity = item.quantity || 1;
          if (name) {
            acc[name] = (acc[name] || 0) + quantity; // Đếm số lần xuất hiện của món ăn
          }
        });
      } else {
        console.warn('order.items is not an array:', order.items); // Cảnh báo nếu order.items không phải mảng
      }
      return acc;
    }, {});
    return dishCounts;
  };

  // tính toán ordertype
  const getOrderType = (orders) => {
    const allowedTypes = ['Dine In', 'To Go', 'Delivery'];
    const filteredOrders = orders.filter((order) =>
      allowedTypes.includes(order.type),
    );
    const totalOrders = filteredOrders.length;
    const typeCounts = filteredOrders.reduce((acc, order) => {
      const type = order.type;
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    }, {});
    const result = Object.entries(typeCounts).map(([type, count]) => {
      const percentage = ((count / totalOrders) * 100).toFixed(1) + '%';
      console.log(
        `📊 Type: ${type}, Count: ${count}, Percentage: ${percentage}`,
      );
      return { type, count, percentage };
    });

    return result;
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        getOrderType,
        createNewOrder,
        getTotalOrders,
        clearOrders,
        countUniqueCustomers,
        getTopDishes,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};
