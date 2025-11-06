import { createContext, useState } from 'react';

// Tạo context
export const DiscountContext = createContext();

export const DiscountProvider = ({ children }) => {
  const [discountCode, setDiscountCode] = useState('');
  const [discountValue, setDiscountValue] = useState(0);

  // Danh sách mã giảm giá
  const discountList = [
    {
      id: 1,
      name: 'vietdepchai',
      description: 'This is discount 1',
      discount: 10,
    },
    {
      id: 2,
      name: 'vietdepchaivl',
      description: 'This is discount 2',
      discount: 20,
    },
    {
      id: 2,
      name: 'vietdepchaivl2',
      description: 'This is discount 2',
      discount: 30,
    },
    {
      id: 3,
      name: 'vietdepchaivl3',
      description: 'This is discount 2',
      discount: 40,
    },
    {
      id: 4,
      name: 'vietdepchaivl4',
      description: 'This is discount 2',
      discount: 50,
    },
  ];

  // Hàm lưu mã giảm giá
  const applyDiscount = (code) => {
    const discountItem = discountList.find((item) => item.name === code);
    if (discountItem) {
      setDiscountCode(code);
      setDiscountValue(discountItem.discount);
    } else {
      setDiscountCode('');
      setDiscountValue(0);
      alert('Mã giảm giá không hợp lệ!');
    }
  };

  return (
    <DiscountContext.Provider
      value={{ discountCode, discountValue, applyDiscount, discountList }}
    >
      {children}
    </DiscountContext.Provider>
  );
};
