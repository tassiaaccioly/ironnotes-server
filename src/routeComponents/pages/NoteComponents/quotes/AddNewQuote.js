import { React, useState, useContext, useEffect } from "react";
import api from "../../../../apis/pagesApi";
import { AuthContext } from "../../../../contexts/authContext";
import "./Quote.css";
import { FormButton } from "../NoteStyles/page";
import { InputForm } from "../NoteStyles/events";

function NewQuote(props) {
  const authContext = useContext(AuthContext);

  const [quote, setQuote] = useState({
    said_by: "",
    quote: "",
  });

  function handleChange(event) {
    setQuote({ ...quote, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await api.post("/quote", quote);
      console.log(response);
    } catch (err) {
      console.error(err);
    }
  }

  function backTrack() {
    document.getElementById("modal").style.display = "block";
    document.getElementById("addForm").style.display = "none";
  }

  return (
    <>
      <div id="addForm" style={{ display: "none" }}>
      <div id="text">
        <InputForm
          placeholder="Who said it??"
          type="text"
          name="said_by"
          value={quote.said_by}
          onChange={handleChange}
        />
        <InputForm
        id="bottom"
          placeholder="What did they say??"
          type="text"
          name="quote"
          value={quote.quote}
          onChange={handleChange}
        />
        <div id="buttons">
        <FormButton onClick={handleSubmit} type="submit">
          Save Quote
        </FormButton>
        <FormButton onClick={backTrack}>Back to Random Quote</FormButton>
        </div>
        </div>
      </div>
    </>
  );
}

export default NewQuote;
