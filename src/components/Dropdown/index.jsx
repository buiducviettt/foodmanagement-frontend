/* eslint-disable react/prop-types */
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
const DropDown = ({ label, options, value, onChange }) => {
  return (
    <Box sx={{ minWidth: 200 }}>
      <FormControl
        fullWidth
        sx={{
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#393C49', // Màu viền mặc định
            },
            backgroundColor: '#1F1D2B',
          },
        }}
      >
        <InputLabel
          sx={{
            color: '#fff', // Màu chữ trắng cho InputLabel
            fontSize: '2rem',

            // Kích thước chữ
          }}
        >
          {label}
        </InputLabel>
        <Select
          value={value}
          label={label}
          onChange={onChange}
          sx={{
            color: 'white',
            fontSize: '1.5rem',
            '& .MuiSvgIcon-root': {
              color: 'white', // Đổi màu mũi tên thành trắng
            },
          }}
        >
          {options.map((option) => (
            <MenuItem
              key={option.value}
              value={option.value}
              sx={{ fontSize: '1.5rem' }}
            >
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};
export default DropDown;
