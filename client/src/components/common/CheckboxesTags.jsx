import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function CheckboxesTags({options,fieldName, setValue}) {
  const handleCheckboxChange = (event, newValue) => {
    setValue(fieldName, newValue);
    
};
  return (
    <Autocomplete
      multiple
      title="checkboxes-tags-demo"
      options={options}
      disableCloseOnSelect
      onChange={handleCheckboxChange}
      getOptionLabel={(option) => option.title}
      renderOption={(props, option, { selected }) => {
        const { key, ...optionProps } = props;
        return (
          <li key={key} {...optionProps}>
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8 }}
              checked={selected}
            />
            {option.title}
          </li>
        );
      }}
      style={{ width: 500, }}
      renderInput={(params) => (
        <TextField {...params} label= {fieldName}   />
      )}
    />
  );
}