import { PieChart, Pie, Cell, Legend } from 'recharts';
import { OrderContext } from '../../../../context/OrderContext';
import { useContext, useMemo } from 'react';
const CustomDonutChart = () => {
  const { orders } = useContext(OrderContext);
  // 1️⃣ Normalize Type (viết hoa thống nhất)
  const normalizeType = (type) => {
    if (!type) return 'Other';
    const t = type.toLowerCase();
    if (t.includes('dine')) return 'Dine In';
    if (t.includes('go')) return 'To Go';
    if (t.includes('delivery')) return 'Delivery';
    return 'Other';
  };

  // 2️⃣ Gom nhóm theo order type
  const data = useMemo(() => {
    const countMap = {};

    orders.forEach((order) => {
      const type = normalizeType(order.type);

      if (!countMap[type]) countMap[type] = 0;
      countMap[type] += 1;
    });

    return Object.keys(countMap).map((key) => ({
      name: key,
      value: countMap[key],
      color: {
        'Dine In': '#FF7CA3',
        'To Go': '#FFB572',
        Delivery: '#65B0F6',
        Other: '#999999',
      }[key],
    }));
  }, [orders]);

  return (
    <div>
      <PieChart width={500} height={300}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={80}
          outerRadius={110}
          dataKey="value"
          startAngle={90}
          endAngle={-270}
          cornerRadius={10}
          paddingAngle={5}
        >
          {data.map((entry, index) => (
            <Cell key={index} fill={entry.color} stroke="none" />
          ))}
        </Pie>

        <Legend
          iconType="circle"
          layout="vertical"
          verticalAlign="middle"
          align="right"
        />
      </PieChart>
    </div>
  );
};

export default CustomDonutChart;
