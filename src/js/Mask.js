// Mask.js
import React from "react";
import "../css/mask.css"; // Import the CSS file for Mask styles

const Mask = ({ onClick }) => {
  return <div className="mask" onClick={onClick}></div>;
};

export default Mask;
