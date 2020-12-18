import React from "react";
import {Link} from "react-router-dom"

import "./Tags.css";

function Tags(props) {
  return (
    <Link className="tag-btn" to={`/pages/tags/${props.tag}`}>
      <span>{props.tag}</span>
    </Link>
  );
}

export default Tags;
