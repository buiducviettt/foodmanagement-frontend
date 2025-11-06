/* eslint-disable no-unused-vars */
import '../../../components/styles/dashboard.scss';
import Images from '../../../../assets/image/Images';
// eslint-disable-next-line react/prop-types
const BoxItem = ({ icon1, percentage, number, title }) => {
  return (
    <div className="box_item">
      <div className="box_item_inner">
        <div className="box_item_icon">
          <div className="box_item_icon_inner">
            <img src={icon1} alt="" />
          </div>
          <p
            className={`percentage_number ${
              percentage >= 0 ? 'text_green' : 'text_red'
            }  `}
          >
            {percentage}%
          </p>
          <div className="arrow_icon">
            {percentage >= 0 ? (
              <img src={Images.arrowup} className="arrow_up_icon" alt="Up" />
            ) : (
              <img
                src={Images.arrowdown}
                className="arrow_down_icon"
                alt="Down"
              />
            )}
          </div>
        </div>
        <div className="box_item_number">
          <h1 className="box_item_number_text">{number}</h1>
        </div>
        <div className="box_item_name">
          <p>{title}</p>
        </div>
      </div>
    </div>
  );
};
export default BoxItem;
