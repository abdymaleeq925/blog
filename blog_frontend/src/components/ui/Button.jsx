import React from "react";
import './button.scss';

export const Button = ({ onClick, btnName="", btnIcon=null, isYellow=false , className=""}) => {
  const baseClass = isYellow ? "action-btn-yellow" : "action-btn";
  const finalClass = `${baseClass} ${className}`.trim();

  return (
    <button onClick={onClick} className={finalClass}>
      {btnName} {btnIcon && <img src={btnIcon} alt="button-icon" />}
    </button>
  );
};
