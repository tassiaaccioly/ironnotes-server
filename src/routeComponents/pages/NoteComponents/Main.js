import React, { useState, useContext } from "react";

//Importações de componentes internos para montar troca de temas
import { GlobalStyle } from "./NoteStyles/globalStyles";
import { LightTheme, DarkTheme } from "./NoteStyles/themes";

//TheProvider é um componente do Styled-components para controlar troca de temas
import { ThemeProvider } from "styled-components";

//---------------------------------------------------------------------//

//Component para montar a página de anotações e quotes
import Sidebar from "./Sidebar";
import Page from "./Page";
import QuotesPopUp from "../NoteComponents/quotes/Quotes";
import NewQuote from "../NoteComponents/quotes/AddNewQuote";

//------------------------------------//

function MainPage() {
  //State para controlar qual tema será usado
  const [theme, setTheme] = useState("light");

  return (
    <div>
      <ThemeProvider theme={theme === "light" ? LightTheme : DarkTheme}>
        <Sidebar themes={{ theme: [theme, setTheme] }} />
        <QuotesPopUp />
        <NewQuote />
        <Page />
        <GlobalStyle />
      </ThemeProvider>
    </div>
  );
}

export default MainPage;
