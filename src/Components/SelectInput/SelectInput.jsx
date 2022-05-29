import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import FormGroup from "@mui/material/FormGroup";
import PropTypes from "prop-types";

export default function SelectInput(props) {
  const { name, value, label, handleChange, errors, children } = props;
  return (
    <FormGroup sx={{ alignContent: "center" }}>
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel id={name}>{label}</InputLabel>
        <Select
          labelId={name}
          id={name}
          name={name}
          value={value}
          label={label}
          onBlur={handleChange}
          onChange={handleChange}
          {...(errors[name] && {
            error: true,
          })}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {children}
        </Select>
      </FormControl>
    </FormGroup>
  );
}

/*
Must pass a label and name prop
 */
SelectInput.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};
