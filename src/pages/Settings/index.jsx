import DefaultLayout from '../../layouts/Default Layout';
import '../components/styles/setting.scss';
import Images from '../../assets/image/Images';
import FoodTab from '../../components/FoodTab';
import Modal from 'react-modal';
import { useState } from 'react';

Modal.setAppElement('#root');
const Setting = () => {
  const settingOptions = [
    {
      id: 1,
      icon: Images.restaurant,
      title: 'Products Management',
      desc: 'Manage your product, pricing, etc',
    },
    {
      id: 2,
      icon: Images.heart,
      title: 'Appereance',
      desc: 'Dark and Light mode, Font size',
    },
    {
      id: 3,
      icon: Images.restaurant,
      title: 'Restaurant',
      desc: 'Dark and Light mode, Font size 2',
    },
    {
      id: 4,
      icon: Images.restaurant,
      title: 'Restaurant',
      desc: 'Dark and Light mode, Font size 2',
    },
  ];
  const [selectedTab, setSelectedTab] = useState(settingOptions[0]);
  return (
    <DefaultLayout>
      <main className="setting_layout">
        <h1 className="setting_layout_title">Settings</h1>
        <div className="sec-gap setting_wrapper">
          <div className="setting_wrapper_left">
            <div className="inner">
              <ul className="settting_options">
                {settingOptions.map((option) => (
                  <li
                    key={option.id}
                    className="setting_option"
                    onClick={() => setSelectedTab(option)}
                  >
                    <div className="item setting_option_details">
                      <img src={option.icon} alt="" />{' '}
                      <div className="item_title">
                        <p>{option.title}</p>
                        <span className="sub_text">{option.desc}</span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="setting_wrapper_right">
            <div className="inner">
              <h2 className="title">{selectedTab.title}</h2>
              {/* Tab 1 - Product Management */}
              {selectedTab.id === 1 && (
                <div
                  className="product_manage"
                  style={{ marginTop: 'var(--pad-pri)' }}
                >
                  <div className="tab">
                    <FoodTab />
                  </div>
                </div>
              )}

              {/* Tab 2 - Appearance */}
              {selectedTab.id === 2 && (
                <div>
                  <button>Toggle Theme</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </DefaultLayout>
  );
};
export default Setting;
