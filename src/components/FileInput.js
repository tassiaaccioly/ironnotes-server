import React from "react";
import "./TextInput.css";
import "./FileInput.css";

function FileInput(props) {
  return (
    <div className="form-group">
      <div className="divider"></div>
      <label className="custom-file-upload" htmlFor={props.id}>
        {props.label}
      </label>
      <input
        type="file"
        className="sign-input"
        id={props.id}
        name={props.name}
        onChange={props.onChange}
      />
    </div>
  );
}

export default FileInput;
