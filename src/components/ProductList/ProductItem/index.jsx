/* eslint-disable react/prop-types */
import '../../ProductList/product.scss';
import { useLocation } from 'react-router-dom';
const ProductItem = ({ image, name, price, number, editDish }) => {
  const pathname = useLocation().pathname;
  return (
    <div className="product_item_wrapper">
      {pathname === '/' && (
        <div className="product_item">
          <div className="product_image">
            <img src={image} alt="product1" />
          </div>
          <div className="product_box">
            <div className="product_box_inner">
              <p
                className="product_name"
                style={{
                  fontWeight: '600',
                }}
              >
                {name}
              </p>
              <p className="product_price">${price} </p>
              <p className="product_number" style={{ color: '#ABBBC2' }}>
                {number} Bowls available
              </p>
            </div>
          </div>
        </div>
      )}
      {pathname === '/setting' && (
        <div
          className="product_item_setting"
          style={{
            aspectRatio: '1/1',
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'column',
            alignItems: 'center',
            border: '1px solid #393C49',
            padding: '2rem',
            borderRadius: '8px',
          }}
        >
          <div
            className="content"
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1.6rem',
            }}
          >
            <div className="product_image_setting">
              <img src={image} alt="product1" />
            </div>
            <div
              className="product_box_setting"
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                flexDirection: 'column',
                flex: 1,
              }}
            >
              <div
                className="product_box_setting_inner"
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '1.6rem',
                }}
              >
                <p
                  className="product_name"
                  style={{
                    fontWeight: '600',
                  }}
                >
                  {name}
                </p>
                <p className="product_price">${price} </p>
                <p className="product_number" style={{ color: '#ABBBC2' }}>
                  {number} Bowls available
                </p>
              </div>
            </div>
          </div>
          <div className="edit_btn btnn --pri w-100" onClick={editDish}>
            Edit Dish
          </div>
        </div>
      )}
    </div>
  );
};
export default ProductItem;
