import React from "react";

const ButtonForm = ({ type = "button", children, onClick, disabled }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`bg-primary-light border border-primary-light rounded-lg py-1 px-3 mt-4 transition duration-300 ease-in-out ${
        disabled ? "cursor-not-allowed" : "text-textActive"
      }`}
    >
      {children}
    </button>
  );
};

export default ButtonForm;
