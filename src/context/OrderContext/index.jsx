import { createContext, useState, useContext, useEffect } from 'react';
import { createOrders, getOrders } from '../../api';

export const OrderContext = createContext();
export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const fetchOrders = async () => {
    try {
      const data = await getOrders();
      setOrders(data);
    } catch (err) {
      console.error('Error fetching orders:', err);
    }
  };
  const createNewOrder = async (cart, customer, type) => {
    try {
      const newOrder = await createOrders(cart, customer, type);
      setOrders((prev) => [newOrder, ...prev]);
      return newOrder;
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <OrderContext.Provider
      value={{
        orders,
        fetchOrders,
        createNewOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => useContext(OrderContext);
