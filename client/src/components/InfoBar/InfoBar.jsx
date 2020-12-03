import React, { useState, useEffect } from "react";
import "./InfoBar.css";

const InfoBar = () => {
  const [item, setItem] = useState(1);
  useEffect(() => {
    setItem(2);
  }, []);
  return <div>my content</div>;
};
export default InfoBar;
