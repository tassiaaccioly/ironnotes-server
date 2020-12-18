import { useEffect, useState, useContext, React } from "react";
import api from "../../../../apis/pagesApi";
import { AuthContext } from "../../../../contexts/authContext";

import { TitleH3, FormButton } from "../NoteStyles/page";
import { PopUp, ContainerPopUp } from "../NoteStyles/events";
import "./Quote.css";

import NewQuote from "./AddNewQuote";

function QuotesPopUp(props) {
  function ClosePopUp() {
    document.getElementById("QuotesPopUp").style.display = "none";
    document.getElementById("QuotesPopUpOne").style.display = "none";
  }

  const authContext = useContext(AuthContext);

  //State para puxar os quotes
  const [quote, setQuote] = useState({
    said_by: "",
    quote: "",
  });

  const [random, setRandom] = useState(false);

  //useEffect para buscar dados na API
  useEffect(() => {
    async function fetchQuotes() {
      try {
        const response = await api.get("/quote");
        console.log(response);
        setQuote({ ...response.data });
      } catch (err) {
        console.error(err);
      }
    }
    fetchQuotes();
  }, [random]);

  function handleClick() {
    setRandom(!random);
  }

  function showForm() {
    document.getElementById("modal").style.display = "none";
    document.getElementById("addForm").style.display = "block";
  }

  return (
    <>
      <PopUp id="QuotesPopUp" onClick={ClosePopUp}></PopUp>
      <ContainerPopUp id="QuotesPopUpOne">
        <div id="modal">
          <div>
            <h3>
              <i>"{quote.quote}"</i>
            </h3>
            <p id="author">Said By: {quote.said_by}</p>
          </div>
          <div id="buttons">
          <FormButton onClick={handleClick}>Random Quote</FormButton>
          <FormButton onClick={showForm}>Add a Quote</FormButton>
          </div>
        </div>
        <NewQuote />
      </ContainerPopUp>
    </>
  );
}

export default QuotesPopUp;
