import { useState } from 'react';
import '../components/styles/account.scss';

import { AuthContext } from '../../context/AuthContent';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
const AccountPage = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const handleLogin = async (e) => {
    e.preventDefault();
    await login(username, password);
    navigate('/');
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
                  <label htmlFor="">Username</label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUserName(e.target.value)}
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
