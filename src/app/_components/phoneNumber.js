"use client";
import { useState } from "react";
import { parsePhoneNumberFromString } from "libphonenumber-js";

const PhoneNumberValidation = ({ value, setValue }) => {
  const [error, setError] = useState("");

  const validatePhone = (value) => {
    const phoneNumber = parsePhoneNumberFromString(value, "US"); // Change "US" for different country codes
    if (!phoneNumber || !phoneNumber.isValid()) {
      setError("Invalid phone number");
    } else {
      setError("");
    }
    setValue(value);
  };

  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={(e) => validatePhone(e.target.value)}
        placeholder="Enter phone number"
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default PhoneNumberValidation;
