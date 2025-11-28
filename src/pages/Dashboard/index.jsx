import DefaultLayout from '../../layouts/Default Layout';
import { useState, useEffect } from 'react';
import BoxItem from './components/box';
import Images from '../../assets/image/Images';
import PageTitle from '../../components/TitleHeading';
import CustomDonutChart from './components/piechart';
// API gọi từ backend
import { getDashboardStats, getTopDishesAPI, getOrders } from '../../api';

// SCSS Dashboard
import '../components/styles/dashboard.scss';

const Dashboard = () => {
  const [stats, setStats] = useState({
    dailyRevenue: 0,
    totalRevenue: 0,
    totalOrders: 0,
    uniqueCustomers: 0,
  });

  const [orders, setOrders] = useState([]);
  const [topDishes, setTopDishes] = useState([]);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const statsRes = await getDashboardStats();
      const ordersRes = await getOrders();
      const topRes = await getTopDishesAPI();

      setStats(statsRes);
      setOrders(ordersRes);
      setTopDishes(topRes);
    } catch (err) {
      console.error('Dashboard load failed:', err);
    }
  };

  return (
    <DefaultLayout>
      <div className="dashboard_layout">
        <div className="dashboard_layout_inner">
          <div className="containerPage">
            {/* RIGHT SIDE */}
            <div className="colPage-7 dashboard_layout_inner_right">
              <PageTitle title="Dashboard" />

              {/* SUMMARY BOX */}
              <div className="sec-gap summary_box">
                <div className="row">
                  <div className="col col-3">
                    <BoxItem
                      percentage="+32%"
                      icon1={Images.coin}
                      number={`$${stats.dailyRevenue}`}
                      title="Daily Revenue"
                    />
                  </div>

                  <div className="col col-3">
                    <BoxItem
                      percentage="+10%"
                      icon1={Images.coin}
                      number={`$${stats.totalRevenue}`}
                      title="Total Revenue"
                    />
                  </div>

                  <div className="col col-3">
                    <BoxItem
                      percentage="+40%"
                      icon1={Images.coin}
                      number={stats.totalOrders}
                      title="Total Orders"
                    />
                  </div>

                  <div className="col col-3">
                    <BoxItem
                      percentage="+5%"
                      icon1={Images.coin}
                      number={stats.uniqueCustomers}
                      title="Unique Customers"
                    />
                  </div>
                </div>
              </div>

              {/* ORDER REPORT */}
              <div className="sec-gap order_report">
                <div className="order_report_inner">
                  <h1>Order Report</h1>

                  <table>
                    <thead>
                      <tr>
                        <th>Order ID</th>
                        <th>Customer</th>
                        <th>Total</th>
                        <th>Status</th>
                      </tr>
                    </thead>

                    <tbody>
                      {orders.map((order) => (
                        <tr key={order.id}>
                          <td>{order.id}</td>
                          <td>{order.customer}</td>
                          <td>${order.total}</td>
                          <td
                            className={`status ${order.status.toLowerCase()}`}
                          >
                            {order.status}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* LEFT SIDE */}
            <div className="colPage-3 dashboard_layout_inner_left">
              {/* MOST ORDERED */}
              <div className="order_list">
                <h2>Most Ordered</h2>

                {topDishes.length === 0 ? (
                  <p>No data</p>
                ) : (
                  topDishes.map((dish) => (
                    <div key={dish.id} className="item_order">
                      <img src={dish.image} className="prod_img" />
                      <div>
                        <p>{dish.name}</p>
                        <p className="sub_text">{dish.count} orders</p>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* PIE CHART */}
              <div className="order_list">
                <h2>Most Type of Order</h2>
                <CustomDonutChart />
              </div>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Dashboard;
