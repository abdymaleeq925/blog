import React from "react";
import './button.css';

export const Button = ({ onClick, btnName, btnIcon=null, isYellow=false }) => {
  return (
    <button onClick={onClick} className={isYellow ? "action-btn-yellow" : "action-btn"}>
      {btnName} {btnIcon && <img src={btnIcon} alt="button-icon" />}
    </button>
  );
};
