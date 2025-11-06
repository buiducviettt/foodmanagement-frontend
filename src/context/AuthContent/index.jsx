/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from 'react';
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://673c683296b8dcd5f3f9d8d8.mockapi.io/food/data/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  // login
  const login = async (username, password) => {
    try {
      const response = await api.get('/users', {
        params: {
          username: username,
          password: password,
        },
      });
      // Kiểm tra nếu có dữ liệu trả về
      const user = response.data.find(
        (user) => user.username === username && user.password === password,
      );
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        alert('Log in thành công');
        console.log('Login thành công:', user);
        setUser(user);
      } else {
        alert('Tài khoản không tồn tại');
      }
    } catch (error) {
      console.error('Lỗi kết nối tới MockAPI:', error.message);
      alert('Có lỗi khi kết nối tới MockAPI. Vui lòng thử lại sau.');
    }
  };
  //log out
  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };
  return (
    <AuthContext.Provider value={{ login, logout, setUser, user }}>
      {children}
    </AuthContext.Provider>
  );
};
