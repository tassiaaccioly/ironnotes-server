import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";

//images
import NLogoDark from "../../assets/images/N_LogoDark.svg";
import LogoutBtn from "../../assets/icons/power_black.svg";

//css
import "./NavBar.css";

//auth
import { AuthContext } from "../../contexts/authContext.js";

function NavBar(props) {
  const authContext = useContext(AuthContext);

  const [mobile, setMobile] = useState(false);

  function handleClick(event) {
    setMobile(!mobile);
  }

  function handleLogoutClick() {
    localStorage.clear();
    authContext.setLoggedInUser({ token: "", user: {} });
    props.history.push("/");
  }

  return (
    <nav className="">
      <Link className="logo" to="/">
        <img type="image/svg+xml" src={NLogoDark} alt="Home" />
      </Link>

      <ul className={!mobile ? "nav-links" : "nav-links nav-active"}>
        <li className={!mobile ? "" : "link-active"}>
          <Link to="/pages">Notebook</Link>
        </li>
        <li className={!mobile ? "" : "link-active"}>
          <Link to="/auth/profile">Profile</Link>
        </li>
        <li className={!mobile ? "" : "link-active"}>
          <Link to="/auth/about">About</Link>
        </li>
        <li className={!mobile ? "" : "link-active"}>
          <a href="https://ironhack.com">Ironhack</a>
        </li>
        <li className={!mobile ? "link-image" : "link-image link-active"}>
          <img
            onClick={handleLogoutClick}
            type="image/svg+xml"
            src={LogoutBtn}
            alt="Logout"
          />
        </li>
      </ul>
      <div onClick={handleClick} className="burger">
        <div className={mobile ? `line 1 toggle` : `line 1`}></div>
        <div className={mobile ? `line 2 toggle` : `line 2`}></div>
        <div className={mobile ? `line 3 toggle` : `line 3`}></div>
      </div>
    </nav>
  );
}

export default NavBar;
