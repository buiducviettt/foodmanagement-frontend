import DefaultLayout from '../../layouts/Default Layout';
import { useCart } from '../../context/CartContext';
import BoxItem from './components/box';
import Images from '../../assets/image/Images';
import '../components/styles/dashboard.scss';
import { useContext, useState, useEffect } from 'react';
import DropDown from '../../components/Dropdown';
import CustomDonutChart from './components/piechart';
import PageTitle from '../../components/TitleHeading';
import { getProducts } from '../../api';
import { OrderContext } from '../../context/OrderContext';
const Dashboard = () => {
  const {
    getTotalOrders,
    orders,
    clearOrders,
    countUniqueCustomers,
    getTopDishes,
  } = useContext(OrderContext);
  console.log('Orders:', orders);
  // eslint-disable-next-line no-unused-vars
  const [topdishes, setTopDishes] = useState([]);
  const { dailyRevenue, totalRevenue } = useCart();
  const [selectedOption, setSelectedOption] = useState('today');
  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProducts();
      setProducts(data);
    };
    fetchProducts();
  }, []);
  // get top dishes
  useEffect(() => {
    const topDishes = getTopDishes(orders); // Lấy top dishes từ orders
    setTopDishes(topDishes); // Cập nhật state topDishes
  }, [orders, getTopDishes]); // Đặt orders và getTopDishes là dependency

  const options = [
    { value: 'today', label: 'Today' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ];
  return (
    <DefaultLayout>
      <div className="dashboard_layout">
        <div className="dashboard_layout_inner">
          <div className="containerPage">
            <div className="row">
              <div className="colPage colPage-7">
                {/* RIGHT_CONTENT */}
                <div className="dashboard_layout_inner_right">
                  <div className="dashboard_title">
                    <PageTitle title="Dashboard" />
                  </div>
                  <div className="sec-gap">
                    <div className="summary_box">
                      <div className="row">
                        <div className="col col-3">
                          <BoxItem
                            percentage="+32.40"
                            icon1={Images.coin}
                            number={`$${dailyRevenue.toFixed(2)}`}
                            title="Daily Revenue"
                          />
                        </div>
                        <div className="col col-3">
                          <BoxItem
                            percentage="-0.40"
                            icon1={Images.coin}
                            number={`$ ${totalRevenue.toFixed(2)}`}
                            title="Total Revenue"
                          />
                        </div>
                        <div className="col col-3">
                          <BoxItem
                            percentage="32.40"
                            icon1={Images.coin}
                            number={getTotalOrders()}
                            title="Total Dish Ordered"
                          />
                        </div>
                        <div className="col col-3">
                          <BoxItem
                            percentage="-2.40"
                            icon1={Images.coin}
                            number={countUniqueCustomers()}
                            title="Total Customer"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="sec-gap box_item order_report">
                    <div className="order_report_inner">
                      <div className="order_report_title">
                        <h1>Order Report</h1>
                        {/* <div className="order_report_filter">
                          <button className="btn --dark order_report_filter_inner">
                            <img
                              className="filter_icon"
                              src={Images.option}
                              alt=""
                            />
                            <p>Filter</p>
                          </button>
                        </div> */}
                        <div className="btnn --pri" onClick={clearOrders}>
                          Xóa đơn hàng
                        </div>
                      </div>
                      <div className="order_report_table">
                        <div className="order_report_table_inner">
                          <table>
                            <thead style={{ color: 'white' }}>
                              <tr>
                                <th>Order ID</th>
                                <th>Customer</th>
                                <th>Total Payment</th>
                                <th>Status</th>
                              </tr>
                            </thead>
                            <tbody>
                              {orders.map((order) => (
                                <tr key={order.id}>
                                  <td className="text-white">{order.id}</td>
                                  <td className="text-white">
                                    {order.customer}
                                  </td>
                                  <td className="text-white">${order.total}</td>
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
                  </div>
                </div>
              </div>
              <div className="colPage colPage-3">
                {/* LEFT_CONTENT */}
                <div className="dashboard_layout_inner_left">
                  <div className="order_list">
                    <div className="order_list_inner">
                      <div className="order_list_header">
                        <div className="order_list_header_inner">
                          <h2>Most Ordered</h2>
                          <div className="order_list_dropdown">
                            {/* <DropDown
                              options={options}
                              value={selectedOption}
                              onChange={handleChange}
                            /> */}
                          </div>
                        </div>
                      </div>
                      <div className="order_list_inner_items sec-gap  ">
                        <div className="inner  ">
                          {topdishes && topdishes.length > 0 ? (
                            topdishes.map((dish) => (
                              <div
                                key={dish.rank}
                                className="item_order prod_item_info"
                              >
                                <div className="item_img">
                                  <img
                                    src={dish.image}
                                    alt={dish.name}
                                    className="prod_img"
                                  />
                                </div>
                                <div className="prod_item_title">
                                  <p>{dish.name}</p>
                                  <p className="sub_text">
                                    {dish.count} dishes ordered
                                  </p>
                                </div>
                              </div>
                            ))
                          ) : (
                            <p>No dishes available</p>
                          )}
                        </div>
                      </div>
                      <div
                        className="btnn --pri cta_btn"
                        style={{ width: '100%' }}
                      >
                        View All
                      </div>
                    </div>
                  </div>
                  <div className="order_list order_figure  ">
                    <div className="order_list_inner">
                      <div className="order_list_header">
                        <div className="order_list_header_inner">
                          <h2>Most Type of Order</h2>
                          <div className="order_list_dropdown">
                            {/* <DropDown
                              options={options}
                              value={selectedOption}
                              onChange={handleChange}
                            /> */}
                          </div>
                        </div>
                      </div>
                      <CustomDonutChart />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};
export default Dashboard;
