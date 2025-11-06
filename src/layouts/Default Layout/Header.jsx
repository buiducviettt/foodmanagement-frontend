import Images from '../../assets/image/Images';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContent';
const Header = () => {
  const { logout } = useContext(AuthContext);
  const handleLogout = async () => {
    await logout();
    window.location.href = '/login';
  };
  return (
    <header className="header">
      <div className="header_wrapper">
        <div className="header_inner">
          <div className="header_logo ">
            <Link to="/">
              <img src={Images.logo} alt="logo" />
            </Link>
          </div>
          <div className="header_icon header_home">
            <Link to="/">
              <img className="icon" src={Images.home} alt="home" />
            </Link>
          </div>
          <div className="header_icon header_discount">
            <Link to="/discount">
              <img className="icon" src={Images.discount} alt="home" />
            </Link>
          </div>
          <div className="header_icon header_dashboard">
            <Link to="/dashboard">
              <img className="icon" src={Images.dashboard} alt="home" />
            </Link>
          </div>

          {/* <div className="header_icon header_noti">
            <Link to="/">
              <img className="icon" src={Images.notification} alt="noti" />
            </Link>
          </div> */}
          <div className="header_icon header_setting">
            <Link to="/setting">
              <img className="icon" src={Images.setting} alt="setting" />
            </Link>
          </div>
          <div className="header_icon header_info">
            <Link to="/account">
              <img className="icon" src={Images.customer} alt="message" />
            </Link>
          </div>
          <div className="header_icon header_logout">
            <Link to="/" onClick={handleLogout}>
              <img className="icon" src={Images.logout} alt="logout" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;
