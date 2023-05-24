import React from "react";

const IconEditCom = ({ className = "" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`feather feather-edit-2 ${className}`}
    >
      <polygon points="16 3 21 8 8 21 3 21 3 16 16 3"></polygon>
    </svg>
  );
};

export default IconEditCom;