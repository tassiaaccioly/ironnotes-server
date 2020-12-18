import React from "react";

import "./BlueBtn.css";

function BlueBtn(props) {
  return <button className="blue-button">{props.children}</button>;
}

export default BlueBtn;
