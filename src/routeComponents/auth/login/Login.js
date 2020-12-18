//dependencies
import React, { useState, useContext } from "react";

//images
import Logo from "../../../assets/images/LogoLight.svg";

//components
import TextInput from "../../../components/TextInput";
import BlueBtn from "../../../components/btns/BlueBtn";

//axios
import api from "../../../apis/pagesApi";

//Token in localStorage
import { AuthContext } from "../../../contexts/authContext";

//css
import "./Login.css";

function Login(props) {
  const authContext = useContext(AuthContext);

  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState({
    email: null,
    password: null,
  });

  function handleChange(event) {
    setLogin({
      ...login,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await api.post("/login", login);

      authContext.setLoggedInUser({ ...response.data });
      localStorage.setItem(
        "loggedInUser",
        JSON.stringify({ ...response.data })
      );
      setError({ password: "", email: "" });
      props.history.push("/pages");
    } catch (err) {
      console.error(err);
      setError({ ...err.response.data.errors });
    }
  }

  return (
    <div className="login">
      <img
        className="Logo"
        type="image/svg+xml"
        style={{ width: "250px" }}
        src={Logo}
        alt="Logo"
      />
      <form className="form" onSubmit={handleSubmit}>
        <TextInput
          autoFocus
          type="email"
          id="loginFormEmail"
          name="email"
          label="E-mail: "
          value={login.email}
          error={error.email}
          onChange={handleChange}
        />

        <TextInput
          autoFocus
          type="password"
          id="loginFormPassword"
          name="password"
          label="Password: "
          value={login.password}
          error={error.password}
          onChange={handleChange}
        />

        <BlueBtn
          className="buttonLogin"
          type="submit"
          disabled={error.password || error.email}
        >
          Login
        </BlueBtn>
      </form>
    </div>
  );
}

export default Login;
