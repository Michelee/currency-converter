import React, { ChangeEvent } from "react";
import './Dropdown.css'

interface OptionsType {
  code: string | number;
  name: string;
}

interface DropdownTypes {
  options: Array<OptionsType>;
  name?: string;
  id: string;
  label: string;
  value: string
  handleChange: (val: ChangeEvent<HTMLSelectElement>) => void;
}

const Dropdown = ({
  options,
  name,
  id,
  label,
  value,
  handleChange,
}: DropdownTypes) => (
  <div className="dropdown-component">
    <label className="dropdown-component__label" htmlFor={id}>{label}</label>
    <select name={name} id={id} onChange={handleChange} className="dropdown-component__select">
      <option value="none">Select an option</option>

      {options.map(({ code, name }: OptionsType) => (
        <option key={code} value={code} selected={value === code}>
          {name}
        </option>
      ))}
    </select>
  </div>
);

export default Dropdown;
