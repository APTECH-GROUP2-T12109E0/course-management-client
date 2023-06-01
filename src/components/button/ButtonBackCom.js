import React from "react";

const ButtonBackCom = ({ className }) => {
  return (
    <button
      onClick={() => window.history.back()}
      className={`btn-block rounded-md transition-all duration-300 min-h-[42px] !leading-[0] px-8 bg-black text-white hover:opacity-80 ${className}`}
    >
      Go Back
    </button>
  );
};

export default ButtonBackCom;
