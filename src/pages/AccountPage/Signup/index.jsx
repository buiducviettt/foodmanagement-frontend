import { useState } from 'react';
import '../../components/styles/account.scss';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContent';
import { useContext } from 'react';
const Signup = () => {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords not match');
      return;
    }
    try {
      const response = await axios.post(
        `https://673c683296b8dcd5f3f9d8d8.mockapi.io/food/data/users`,
        {
          username: formData.userName,
          email: formData.email,
          password: formData.password,
        },
      );
      const newUser = response.data;
      localStorage.setItem('user', JSON.stringify(newUser));
      setUser(newUser); // cập nhật context ngay lập tức
      console.log('Đăng ký thành công', response.data);
      alert('Đăng ký thành công');
      navigate('/account');
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="signup_page">
      <div className="signup_wrapper">
        <div className="signup_content">
          <h2>Sign Up</h2>
          <form action="" className="signup_form" onSubmit={handleSubmit}>
            <div className="form_group">
              <label htmlFor="username">Username</label>
              <input
                required
                name="userName"
                type="text"
                value={formData.userName}
                onChange={handleChange}
              />
            </div>
            <div className="form_group">
              <label htmlFor="password">Password</label>
              <input
                required
                type="password"
                value={formData.password}
                onChange={handleChange}
                name="password"
              />
            </div>
            <div className="form_group">
              <label htmlFor="confirm_pass">Confirm Password</label>
              <input
                required
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>
            <div className="form_group">
              <label htmlFor="email">Email</label>
              <input
                name="email"
                type="text"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <button className="btnn --pri w-100 signup_btn" type="submit">
              Sign up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Signup;
