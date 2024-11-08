import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelect({ register, setValue }) {
  const [top, setTop] = React.useState('50');

  const handleChange = (event) => {
    setTop(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Top</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={top}
          label="Top"
          {...register('top')}
          onChange={handleChange}
        >
          <MenuItem value={10}>Top 10</MenuItem>
          <MenuItem value={20}>Top 20</MenuItem>
          <MenuItem value={50}>Top 50</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
