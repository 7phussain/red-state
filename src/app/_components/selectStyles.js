export const selectStyles = {
  control: (provided) => ({
    ...provided,
    backgroundColor: "transparent", // No background
    border: "none", // Removes border
    borderBottom: "1px solid #F0F0F0",
    // padding: "px 0px",
    boxShadow: "none", // Removes focus outline
    color: "var(--primary)",
    fontSize: "small",
    borderRadius: "0px",
    // Uses CSS variable for text
  }),
  input: (provided) => ({
    ...provided,
    padding: "0px",
    color: "var(--primary)", // Uses CSS variable for selected text
  }),
  singleValue: (provided) => ({
    ...provided,
    padding: "0px",
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
    "&:hover": {
      background: "var(--primary)",
      color: "#FFFFFF",
    },
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    color: "var(--primary)", // Icon color
  }),

  indicatorSeparator: () => ({
    display: "none", // ❌ Removes the vertical divider next to the dropdown indicator
  }),
};

export const selectStylesFilter = {
  control: (provided) => ({
    ...provided,
    backgroundColor: "transparent",
    // border: "1px solid #000",
    border: "none",
    borderBottom: "1px solid var(--primary)",
    boxShadow: "none",
    color: "#000",
    fontSize: "small",
    // borderRadius: "6px",
    borderRadius: "0px",
    minWidth: "120px"
  }),
  input: (provided) => ({
    ...provided,
    padding: "0px",
    color: "#000000", // Uses CSS variable for selected text
  }),
  singleValue: (provided) => ({
    ...provided,
    padding: "0px 10px",
    color: "#000", // Uses CSS variable for selected text
  }),
  placeholder: (provided) => ({
    ...provided,
    padding: "0px 10px",
    color: "#666", // Placeholder text color
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
    "&:hover": {
      background: "var(--primary)",
      color: "#FFFFFF",
    },
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    color: "#666",
  }),

  indicatorSeparator: () => ({
    display: "none", // ❌ Removes the vertical divider next to the dropdown indicator
  }),
};

