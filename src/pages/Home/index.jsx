import DefaultLayout from '../../layouts/Default Layout';
import { format } from 'date-fns';
import ProductList from '../../components/ProductList';
import { useState, useEffect, useContext } from 'react';
import '../components/styles/home.scss';
import { useCart } from '../../context/CartContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import Images from '../../assets/image/Images';
import Form from 'react-bootstrap/Form';
import { DiscountContext } from '../../context/DiscountContext';
import { OrderContext } from '../../context/OrderContext';
import Modal from 'react-modal';
import FoodTab from '../../components/FoodTab';
Modal.setAppElement('#root');
const Home = () => {
  const [method, setMethod] = useState('');
  const { discountValue, applyDiscount } = useContext(DiscountContext);
  const { createNewOrder } = useContext(OrderContext);
  const { cartItems, removeFromCart, totalPrice, addToRevenue } = useCart();
  const [inputCode, setInputCode] = useState('');
  const [formData, setFormData] = useState({
    cardholderName: '',
    cardNumber: '',
    expirationDate: '',
    cvv: '',
    orderType: 'Dine In',
    tableNo: '144',
    total: '',
  });

  const handleChangeForm = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const [openPopup, setOpenPopup] = useState(false);
  const handleOpenPopup = () => {
    console.log('open popup');
    setOpenPopup(true);
  };
  const handleClosePopup = () => {
    console.log('open popup');
    setOpenPopup(false);
  };
  const [currentStep, setCurrentStep] = useState(1);

  const handleNextStep = () => {
    return setCurrentStep((prev) => prev + 1);
  };
  const handlePrevStep = () => {
    return setCurrentStep((prev) => prev - 1);
  };

  //logic tinh toan
  let discountPercentage = `${discountValue}%`;
  let subtotal = totalPrice - totalPrice * (discountValue / 100);
  const paymentMethods = [
    {
      id: 'paypal',
      name: 'Paypal',
      img: Images.paypal, // Không cần template string `${}`
    },
    {
      id: 'credit_card',
      name: 'Credit Card',
      img: Images.card,
    },
    {
      id: 'cash',
      name: 'Cash',
      img: Images.wallet,
    },
  ];
  const handleMethod = (id) => {
    setMethod(id);
    console.log('Selected method:', id);
  };
  //
  const handleSubmit = async () => {
    try {
      console.log('FormData:', formData);

      // ✅ Tạo đơn hàng (nếu createNewOrder không phải async, thì không cần await)
      const newOrder = await createNewOrder(
        cartItems,
        formData.cardholderName,
        formData.orderType,
        subtotal,
      );
      console.log('newOrder:', JSON.stringify(newOrder, null, 2));
      alert(`Thanh toán thành công! Tổng tiền: ${subtotal}`);
      // ✅ Đợi cộng doanh thu xong (nếu hàm là async)
      await addToRevenue();
      // ✅ Reset giỏ hàng nếu muốn (tránh reload toàn trang)
      // clearCart(); // nếu có
      // ✅ Reload nhẹ nhàng (có thể thay bằng chuyển route hoặc reset form)
      window.location.reload();
    } catch (error) {
      console.error('Error creating order:', error);
      alert('Có lỗi xảy ra trong quá trình thanh toán. Vui lòng thử lại!');
    }
  };
  const [date, setDate] = useState('');
  useEffect(() => {
    const now = new Date();
    const formattedDate = format(now, 'EEEE, d MMM yyyy'); // Format ngày
    setDate(formattedDate);
  }, []);
  return (
    <DefaultLayout>
      <>
        {' '}
        <div className="home_layout ">
          <div className="home_menu">
            <div className="home_header">
              <div className="home_header_info">
                <h1>Ducky F&B</h1>
                <p>{date}</p>
              </div>
              {/* Search ở đây */}
            </div>
            <div className="home_tabs sec-gap">
              <FoodTab />
            </div>
          </div>
          <div className="home_order">
            <div className="home_order_inner">
              {currentStep === 1 && (
                <div>
                  <h1>Orders</h1>
                  <div className="sec-gap home_order_table">
                    <table className="home_order_table_inner">
                      <thead className="table_heading_wrapper">
                        <tr>
                          <th
                            className="table_headings"
                            style={{ color: 'white' }}
                          >
                            Item
                          </th>
                          <th
                            className="table_headings"
                            style={{ color: 'white' }}
                          >
                            Qty
                          </th>
                          <th
                            className="table_headings"
                            style={{ color: 'white' }}
                          >
                            Price
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {cartItems.length === 0 ? (
                          <p>Hiện không có sản phẩm này</p>
                        ) : (
                          cartItems.map((item) => (
                            <tr key={item.id}>
                              <td
                                style={{ color: 'white' }}
                                className="prod_item_info"
                              >
                                <img
                                  src={item.image}
                                  alt=""
                                  className="prod_img"
                                />
                                {item.title}
                              </td>
                              <input
                                placeholder="Order Note..."
                                type="text"
                                className="comment_order"
                                style={{
                                  width: '30rem',
                                  fontSize: '1.4rem',
                                  height: '5rem',
                                }}
                              />
                              <td
                                className="home_order_table_inner_wrapper_price"
                                style={{ color: 'white' }}
                              >
                                {item.quantity}
                              </td>
                              <td style={{ color: 'white' }}>
                                ${item.price}
                                <div className="remove_item icon">
                                  <FontAwesomeIcon
                                    icon={faTrash}
                                    onClick={() => removeFromCart(item.id)}
                                  />
                                </div>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                  <div
                    className="sec-gap home_order_total"
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '2rem',
                    }}
                  >
                    <div
                      className="home_order_discount"
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                      }}
                    >
                      <input
                        value={inputCode}
                        onChange={(e) => setInputCode(e.target.value)}
                        type="text"
                        placeholder="Enter your discount"
                        className="discount_input"
                      />
                      <div
                        className="btnn btnn--pri"
                        onClick={() => applyDiscount(inputCode)}
                      >
                        Áp dụng
                      </div>
                    </div>
                    {/* <div>
                      {discountCode && <p>Đã áp dụng mã: {discountCode}</p>}
                    </div> */}
                    <div
                      className="home_order_discount"
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                      }}
                    >
                      <p>Total</p>
                      <p>${totalPrice}</p>
                    </div>
                    <div
                      className="home_order_discount"
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                      }}
                    >
                      <p>Discount</p>
                      <p>{discountPercentage}</p>
                    </div>

                    <div
                      className="home_order_discount"
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                      }}
                    >
                      <p>Sub total</p>
                      <p>${subtotal.toFixed(2)}</p>
                    </div>
                  </div>
                  <div
                    style={{ width: '100%' }}
                    className="btnn --pri order_div"
                    onClick={handleNextStep}
                  >
                    Continue to Payment
                  </div>
                </div>
              )}
              {currentStep === 2 && (
                <div className="home_order_payment">
                  <h1>Payment</h1>
                  <p>3 payment method available</p>
                  <div className="sec-gap home_order_payment_inner">
                    <div className=" payment_method">
                      <div className="payment_method_title">
                        <h2>Payment Method</h2>
                      </div>
                      <div className="payment_method_inner">
                        <div className="row">
                          {paymentMethods.map((item, index) => (
                            <div key={index} className="col col-4">
                              <div
                                onClick={() => handleMethod(item.id)}
                                className={
                                  method === item.id
                                    ? 'method_item active'
                                    : 'method_item'
                                }
                                tabIndex="0"
                                id={item.id}
                              >
                                <img
                                  src={item.img}
                                  alt=""
                                  className="method_img"
                                />
                                <div className="method_name">
                                  <p>{item.name}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="sec-gap home_order_payment_inner_form">
                      <Form className=" home_order_payment_form">
                        <Form.Group>
                          <Form.Label>Cardholder Name</Form.Label>
                          <div className="form_input">
                            <Form.Control
                              name="cardholderName"
                              value={formData.cardholderName}
                              type="text"
                              placeholder="Levi Ackerman"
                              onChange={handleChangeForm}
                            ></Form.Control>
                          </div>
                        </Form.Group>
                        <Form.Group>
                          <Form.Label>Card Number</Form.Label>
                          <div className="form_input">
                            <Form.Control
                              name="cardNumber"
                              value={formData.cardNumber}
                              type="number"
                              placeholder="2564 1421 0897 1244"
                              onChange={handleChangeForm}
                            ></Form.Control>
                          </div>
                        </Form.Group>
                        <Form.Group>
                          <div className="row">
                            <div className="col col-6">
                              <Form.Label>Expiration Date</Form.Label>
                              <div className="form_input">
                                <Form.Control
                                  name="expirationDate"
                                  value={formData.expirationDate}
                                  type="text"
                                  placeholder="02/2022"
                                  onChange={handleChangeForm}
                                ></Form.Control>
                              </div>
                            </div>

                            <div className="col col-6">
                              <Form className=" home_order_payment_form">
                                <Form.Group>
                                  <Form.Label>CVV</Form.Label>
                                  <div className="form_input">
                                    <Form.Control
                                      name="cvv"
                                      value={formData.cvv}
                                      type="password"
                                      onChange={handleChangeForm}
                                    ></Form.Control>
                                  </div>
                                </Form.Group>
                              </Form>
                            </div>
                            <div className="col col-6"></div>
                          </div>
                        </Form.Group>
                        <Form.Group>
                          <div className="row">
                            <div className="col col-6">
                              <Form.Label>Order Type</Form.Label>
                              <div className="form_input">
                                <Form.Select
                                  type="text"
                                  name="orderType"
                                  onChange={handleChangeForm}
                                >
                                  <option value="Dine in">Dine In</option>
                                  <option value="To Go">To Go</option>
                                  <option value="Delivery">Delivery</option>
                                </Form.Select>
                              </div>
                            </div>
                            <div className="col col-6">
                              <Form.Label>Table no.</Form.Label>
                              <div className="form_input">
                                <Form.Control
                                  onClick={handleChangeForm}
                                  name="tableNo"
                                  type="text"
                                  value="144"
                                  readOnly
                                ></Form.Control>
                              </div>
                            </div>
                            <div className="col col-6"></div>
                          </div>
                        </Form.Group>
                      </Form>
                      <div
                        className="cta_group order_cta_group"
                        style={{
                          display: 'grid',
                          gridTemplateColumns: '1fr 1fr',
                        }}
                      >
                        <div
                          className="btnn --pri cta_btnn cancel_btnn"
                          onClick={handlePrevStep}
                          style={{ width: '100%' }}
                        >
                          <p className="shining_text">Cancel</p>
                        </div>
                        <div
                          className="btnn --pri cta_btnn confirm_btnn"
                          onClick={handleOpenPopup}
                          style={{ width: '100%' }}
                        >
                          <p className="shining_text">Confirm Order</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <Modal
            className="order_popup"
            isOpen={openPopup}
            onRequestClose={handleClosePopup}
            style={{
              content: {
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                padding: '20px',
                borderRadius: '8px',
                display: 'flex',
                gap: '2rem',
                flexDirection: 'column',
                color: 'white',
                justifyContent: 'center',
                alignItems: 'center', // Đảm bảo nội dung bên trong được căn giữa
              },
            }}
          >
            <div className="order_form_thankyou">
              <h1>CONFIRM FOR YOUR ORDER</h1>
            </div>
            <div
              className="order_form_info"
              style={{
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                gap: '2rem',
              }}
            >
              <h2>Here is your information</h2>
              <p>
                <strong>Order price:</strong> {subtotal}
              </p>
              <p>
                <strong>OrderType:</strong> {formData.orderType}
              </p>
              <p>
                <strong>Method:</strong> {method}
              </p>
              <p>
                <strong>Cardholder Name:</strong> {formData.cardholderName}
              </p>
              <p>
                <strong>Card Number:</strong> {formData.cardNumber}
              </p>
              <p>
                <strong>Expiration Date:</strong> {formData.expirationDate}
              </p>
              <p>
                <strong>CVV:</strong> {formData.cvv}
              </p>
              <p>
                <strong>Table No.:</strong> {formData.tableNo}
              </p>
            </div>
            <div className="btnn btn--pri" onClick={handleSubmit}>
              Payment
            </div>
          </Modal>
        </div>
      </>
    </DefaultLayout>
  );
};
export default Home;
