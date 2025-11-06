import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import ProductList from '../ProductList';
import { useState } from 'react';
const FoodTab = () => {
  const [value, setValue] = useState('all');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box>
      <Tabs
        TabIndicatorProps={{
          style: { backgroundColor: '#EA7C69' }, // Đổi màu dòng kẻ ở đây
        }}
        value={value}
        onChange={handleChange}
        sx={{
          '& .MuiTab-root': { color: '#fff', fontSize: '1.4rem' }, // Màu chữ mặc định
          '& .Mui-selected': { color: '#EA7C69 !important' },
        }}
      >
        <Tab value="all" label="All" />
        <Tab value="hot-dishes" label="Hot Dishes" />
        <Tab value="cold-dishes" label="Cold Dishes" />
        <Tab value="soup" label="Soup" />
        <Tab value="grill" label="Grill" />
        <Tab value="appetizer" label="Appetizer" />
        <Tab value="dessert" label="Dessert" />
      </Tabs>
      <div>
        <Box sx={{ marginTop: '2.4rem', color: '#fff' }}>
          <div className="home_prod">
            <div className="home_prod_list">
              <ProductList value={value} />
            </div>
          </div>
        </Box>
      </div>
    </Box>
  );
};
export default FoodTab;
