import React from "react";

const HeadingH1Com = ({ children, className = "", number = null }) => {
  return (
    <h1
      className={`text-3xl font-semibold font-tw-third text-black mb-[1.25rem] ${className}`}
    >
      {children}
      {number && <span className="text-tw-light-pink"> {`(${number})`}</span>}
    </h1>
  );
};

export default HeadingH1Com;
