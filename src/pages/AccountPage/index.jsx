import { useState } from 'react';
import '../components/styles/account.scss';

import { login } from '../../api';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
const AccountPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const handleLogin = async (e) => {
    e.preventDefault();
    // Gọi API login
    const res = await login(email, password);

    // Nếu login thành công, có token
    if (res?.token) {
      alert('Đăng nhập thành công!');
      localStorage.setItem('token', res.token);
      localStorage.setItem('user', JSON.stringify(res.user));
      navigate('/'); // chuyển hướng về trang chủ
    } else {
      alert(res?.message || 'Đăng nhập thất bại!');
    }
  };
  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };
  return (
    <div className="account_page">
      <div className="container">
        <div className="account_wrapper">
          <div className="account_table">
            <div className="inner">
              <div className="account_title">
                <h1>WELCOME TO DUCKY RESTAURANT </h1>
                <h2 className="text-center">Please sign in to see the app </h2>
              </div>
              <ul className="form_groups">
                <li className="form_group">
                  <label htmlFor="">Email</label>
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </li>
                <li className="form_group">
                  <label htmlFor="">Password</label>
                  <input
                    className="password_input"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <span className="show_password" onClick={togglePassword}>
                    {showPassword ? 'Hide' : 'Show'}
                  </span>
                </li>
              </ul>
              <button className="btnn --pri w-100 log_in" onClick={handleLogin}>
                Log in
              </button>
              <span>
                Don't have account, please{' '}
                <a href="/signup" style={{ textDecoration: 'underline' }}>
                  {' '}
                  Sign up
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
