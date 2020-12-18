import React from "react";
import { Link } from "react-router-dom";
import './NoMatch.css';

import BlueBtn from "../btns/BlueBtn";

function NoMatch() {
  return (
    <main>
      <div className="errorPage">
        <img
          src="https://nerdweb.com.br/uploads/1578511646-cropit-.jpg"
          alt="Page not found"
        />
      </div>
      <div className="btn">
        <BlueBtn>
          <Link to="/">Back to Homepage</Link>
        </BlueBtn>
      </div>

    </main>
  );
}

export default NoMatch;
