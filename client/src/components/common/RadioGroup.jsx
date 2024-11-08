import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function ControlledRadioButtonsGroup({ register, setValue , fieldName}) {
  // Rename the state variable to avoid confusion
  const [localValue, setLocalValue] = React.useState('Ascending');
  setValue(fieldName, localValue);

  const handleChange = (event) => {
    const selectedValue = event.target.value;
    setLocalValue(selectedValue);  // Update local state
    setValue(fieldName, selectedValue);  // Update form value using setValue prop
  };

  return (
    <FormControl>
      <FormLabel id="controlled-radio-buttons-group">{fieldName} Order</FormLabel>
      <RadioGroup
        aria-labelledby="controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={localValue}
        onChange={handleChange}
      >
        <FormControlLabel value="Ascending" control={<Radio />} label="Ascending" />
        <FormControlLabel value="Descending" control={<Radio />} label="Descending" />
      </RadioGroup>
    </FormControl>
  );
}
