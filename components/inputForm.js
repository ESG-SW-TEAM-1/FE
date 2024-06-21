import React from "react";

const InputForm = ({
  label,
  className,
  type,
  name,
  placeholder,
  value,
  onChange,
}) => {
  return (
    <div>
      <label className={`block text-textInactive text-sm ${className}`}>
        {label}
      </label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full border border-primary p-2 ${className} rounded-lg focus:border-primary-300 focus:ring-primary-300 focus:ring-2 focus:outline-none`}
      />
    </div>
  );
};

export default InputForm;
