import React from "react";

import "./InternalServerError.css";

import BlueBtn from "../btns/BlueBtn";

function InternalServerError() {
  return (
    <div>
      <img
        src="https://www.wpexplorer.com/wp-content/uploads/wordpress-500-internal-server-error-fixes.jpg"
        alt="Internal Server Error"
      />

      <BlueBtn onClick={() => window.location.reload()}>
        Reload the page
      </BlueBtn>
    </div>
  );
}

export default InternalServerError;
