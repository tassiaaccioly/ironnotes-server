//Bibliotecas
import { Link } from "react-router-dom";
import React, { useEffect, useState, useContext } from "react";
import api from "../../../apis/pagesApi";
import { AuthContext } from "../../../contexts/authContext";

//Componentes
import NewPage from "./PageEvents/NewPage";
import QuotesPopUp from "./quotes/Quotes";

//CSS em componentes
import {
  Nav,
  SearchBar,
  ListItems,
  PullNavMobile,
  Logo,
  ListNavTitle,
  NavOptions,
  Options,
  NavRight,
  IconRight,
  IconListArrow,
} from "./NoteStyles/nav.style";

//Imagens
import logoWhite from "../../../assets/images/LogoLight.svg";
import logoDark from "../../../assets/images/LogoDark.svg";
import Dark from "../../../assets/icons/nights_stay-black-18dp.svg";
import LogoutBlack from "../../../assets/icons/power_black.svg";
import LogoutWhite from "../../../assets/icons/power_white.svg";
import SettingsBlack from "../../../assets/icons/settings_black.svg";
import SettingsWhite from "../../../assets/icons/settings_white.svg";
import AboutBlack from "../../../assets/icons/about_black.svg";
import AboutWhite from "../../../assets/icons/about_white.svg";
import ArrowWhite from "../../../assets/icons/keyboard_arrow_right-white-18dp.svg";
import ArrowBlack from "../../../assets/icons/keyboard_arrow_right-black-18dp.svg";
import Sun from "../../../assets/icons/wb_sunny-black-18dp.svg";
import EmojiBlack from "../../../assets/icons/tongue_black.svg";
import EmojiWhite from "../../../assets/icons/tongue_white.svg";

function Sidebar(props) {
  const authContext = useContext(AuthContext);
  //State para guardar todos os resultados para montar a lista na barra de navegação
  const [list, setList] = useState([
    {
      _id: "",
      title: "",
    },
  ]);

  //useEffect para buscar dados na API
  useEffect(() => {
    async function Text() {
      try {
        const response = await api.get("/titles");
        setList([...response.data]);
      } catch (err) {
        console.error(err);
      }
    }
    Text();
  }, []);

  //--------------------------------------------------------------------//

  //State para controlar barra lateral do modo mobile
  const [nav, setNav] = useState({
    active: "-100%",
  });

  //Função para esconder ou puxar a barra de navegação
  function Pull() {
    if (nav.active === "-100%") {
      setNav({ active: "0%" });
    } else {
      setNav({ active: "-100%" });
    }
    document.getElementById("Pull").style.right = nav.active;
  }

  //Function to logout
  function handleLogoutClick() {
    localStorage.clear();
    authContext.setLoggedInUser({ token: "", user: {} });
    props.history.push("/");
  }

  //------------------------------------------------------------------//

  //Retirando das props o State de themas
  const theme = props.themes.theme[0];
  const setTheme = props.themes.theme[1];

  //Fazendo a troca de Tema para dark ou light
  const themeToggle = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };

  //------------------------------------------------------------------//

  const toggleQuotes = () => {
    document.getElementById("QuotesPopUp").style.display = "block";
    document.getElementById("QuotesPopUpOne").style.display = "block";
  };

  return (
    <>
      <QuotesPopUp />
      <NavRight>
        <IconRight onClick={themeToggle} src={theme === "light" ? Dark : Sun} />
        <IconRight
          onClick={toggleQuotes}
          src={theme === "light" ? EmojiBlack : EmojiWhite}
        />
        <Link to="/auth/about">
          <IconRight src={theme === "light" ? AboutBlack : AboutWhite} />
        </Link>
        <Link to="/auth/profile">
          <IconRight src={theme === "light" ? SettingsBlack : SettingsWhite} />
        </Link>
        <IconRight
          onClick={handleLogoutClick}
          src={theme === "light" ? LogoutBlack : LogoutWhite}
        />
      </NavRight>
      <PullNavMobile onClick={Pull}>Menu</PullNavMobile>
      <Nav id="Pull">
        <Link to="/">
          <Logo src={theme === "light" ? logoDark : logoWhite} alt="logo" />
        </Link>
        <Link
          to="/pages/search"
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <SearchBar placeholder="Search here"></SearchBar>
        </Link>

        <ListItems>
          {list.map((list) => (
            <Link
              key={list._id}
              to={`/pages/${list._id}`}
              style={{ textDecoration: "none" }}
            >
              <ListNavTitle>
                <IconListArrow
                  src={theme === "light" ? ArrowBlack : ArrowWhite}
                ></IconListArrow>{" "}
                {list.title}
              </ListNavTitle>
            </Link>
          ))}
        </ListItems>
        <NavOptions>
          <Options>
            <Link to="/pages/newpage">+ New Note</Link>
          </Options>
        </NavOptions>
      </Nav>
    </>
  );
}

export default Sidebar;
