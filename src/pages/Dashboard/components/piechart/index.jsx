import { PieChart, Pie, Cell, Legend } from 'recharts';
import { OrderContext } from '../../../../context/OrderContext';
import { useContext } from 'react';

const CustomDonutChart = () => {
  const { getOrderType, orders } = useContext(OrderContext);
  const colorMap = {
    'Dine In': '#FF7CA3',
    'To Go': '#FFB572',
    Delivery: '#65B0F6',
  };
  const data = getOrderType(orders).map((item) => ({
    name: item.type,
    value: item.count,
    color: colorMap[item.type] || '#999999', // fallback màu xám nếu không khớp
  }));
  return (
    <div>
      <PieChart width={500} height={300}>
        {/* Vòng tròn chính có các phần tử */}
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={80}
          outerRadius={110}
          dataKey="value"
          startAngle={90}
          endAngle={-270}
          cornerRadius={10} // Bo góc
          paddingAngle={5} // Khoảng cách giữa các phần
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
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
