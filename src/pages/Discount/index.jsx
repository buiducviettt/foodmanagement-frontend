import DefaultLayout from '../../layouts/Default Layout';
import '../components/styles/discount.scss';
import PageTitle from '../../components/TitleHeading';
import { useContext, useState } from 'react';
import Images from '../../assets/image/Images';
import { DiscountContext } from '../../context/DiscountContext';
const Discount = () => {
  const { discountList } = useContext(DiscountContext);
  const [copiedID, setCopiedID] = useState(null);
  const handleCopy = (text, id) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopiedID(id);
        setTimeout(() => setCopiedID(null), 1500);
      })
      .catch((error) => console.error(error));
  };
  return (
    <DefaultLayout>
      <div className="discount_page">
        <div className="inner">
          <PageTitle title="Discount" />
          <div className="sec-gap discount_coupons">
            <ul className="discount_items">
              {discountList.map((item, index) => (
                <li key={index} className="discount_item">
                  <div className="discount_img">
                    <img src={Images.voucher} alt="voucher" />
                  </div>
                  <div className="discount_info">
                    <div className="discount_name">{item.name}</div>
                    <div className="discount_desc">{item.description}</div>
                    <div
                      style={{ cursor: 'pointer' }}
                      className="copy_text"
                      onClick={() => handleCopy(item.name, item.id)}
                    >
                      {copiedID === item.id ? 'Đã sao chép!' : 'Sao chép mã'}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};
export default Discount;
