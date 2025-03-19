export const selectStyles = {
  control: (provided) => ({
    ...provided,
    backgroundColor: "transparent", // No background
    border: "none", // Removes border
    boxShadow: "none", // Removes focus outline
    color: "var(--primary)",
    fontSize: "small"
    // Uses CSS variable for text
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "var(--primary)", // Uses CSS variable for selected text
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "var(--primary)", // Placeholder text color
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: "white", // No background
  }),
  menuList: (provided) => ({
    ...provided,
    padding: 0, // Removes extra padding
  }),
  option: (provided, state) => ({
    ...provided,
    color: "var(--primary)", // Text color
    borderBottom: "1px solid var(--primary)", // Divider between options
    backgroundColor: "transparent", // No background
    cursor: "pointer",
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    color: "var(--primary)", // Icon color
  }),

  indicatorSeparator: () => ({
    display: "none", // ❌ Removes the vertical divider next to the dropdown indicator
  }),
};
