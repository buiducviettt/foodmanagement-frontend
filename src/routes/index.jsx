import Homepage from '../pages/Home';
import Dashboard from '../pages/Dashboard';
import Setting from '../pages/Settings';
import Discount from '../pages/Discount';
import AccountPage from '../pages/AccountPage';
import Signup from '../pages/AccountPage/Signup';
import AccountInfo from '../pages/AccountInfo';
export const publicRoutes = [
  {
    path: '/signup',
    component: Signup,
  },
  {
    path: '/login',
    component: AccountPage,
  },
];

export const privateRoutes = [
  {
    path: '/account',
    component: AccountInfo,
  },
  {
    path: '/discount',
    component: Discount,
  },
  {
    path: '/setting',
    component: Setting,
  },
  {
    path: '/',
    component: Homepage,
  },
  {
    path: '/dashboard',
    component: Dashboard,
  },
];
