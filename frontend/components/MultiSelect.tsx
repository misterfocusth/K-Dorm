import React, { useState } from "react";

// Define the type for an option
type Option = {
  label: string;
  value: string;
};

type MultiSelectProps = {
  options: Option[]; // List of available options
  selectedValues: string[]; // Values of currently selected options
  onChange: (selected: string[]) => void; // Callback for when selection changes
};

const MultiSelect: React.FC<MultiSelectProps> = ({ options, selectedValues, onChange }) => {
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(event.target.selectedOptions, (option) => option.value);
    onChange(selectedOptions); // Pass selected values back to parent
  };

  return (
    <select multiple={true} value={selectedValues} onChange={handleSelectChange}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default MultiSelect;
