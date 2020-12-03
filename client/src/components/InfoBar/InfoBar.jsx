import React, { useState, useEffect } from "react";
import "./InfoBar.css";

const InfoBar = ({room}) => {
  const [item, setItem] = useState(1);
  useEffect(() => {
    setItem(2);
  }, []);
  return <div className="infoBar">
    <div className="leftInnerContainer">
      <h3>{room}</h3>
    </div>
    <div className="rightInnerContainer">
      <a href="/">close</a>
    </div>
    </div>;
};
export default InfoBar;
