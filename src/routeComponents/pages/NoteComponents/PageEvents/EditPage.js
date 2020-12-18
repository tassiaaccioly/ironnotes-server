//Bibliotecas
import React, { useState, useEffect, useContext } from "react";
import MDEditor from "@uiw/react-md-editor";
import api from "../../../../apis/pagesApi";
import { AuthContext } from "../../../../contexts/authContext";

//CSS em componentes
import { InputForm } from "../NoteStyles/events";
import {
  Button,
  Container,
  Fix,
  FixHTML,
  Title,
  TitleH3,
} from "../NoteStyles/page";

function Page(props) {
  useContext(AuthContext);
  //State para armazenar e fazer o render do conteúdo
  const [file, setFile] = useState({
    _id: "",
    title: "",
    text: "",
    tags: [""],
  });

  //Buscando o path(Caminho) da url para retirar o Id
  const { id } = props.match.params;
  useEffect(() => {
    async function Text() {
      try {
        const response = await api.get(`/pages/${id}`);
        setFile({ ...response.data });
      } catch (err) {
        console.error(err);
      }
    }
    Text();
  }, [id]);

  function handleChange(event) {
    setFile({ ...file, [event.currentTarget.name]: event.currentTarget.value });
  }

  function textInput(event) {
    setFile({ ...file, text: event });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      await api.patch(`/pages/${id}`, file);
      props.history.push(`/pages/${id}`);
    } catch (err) {
      console.error(err);
    }
  }

  async function handleDelete(event) {
    event.preventDefault();
    try {
      await api.delete(`/pages/${id}`);
      props.history.push(`/pages`);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      <FixHTML></FixHTML>
      <Container id="EditPagePopUpOne">
        <Fix>
          <Title>Edit this note</Title>
          <div
            style={{
              // display: "flex",
              // flexDirection: "column",
              // alignItems: "start",
              width: "100%",
              margin: "3% auto",
            }}
          >
            <label htmlFor="pageTitle">
              <TitleH3>Title:</TitleH3>
            </label>
            <InputForm
              type="text"
              name="title"
              id="pageTitle"
              value={file.title}
              onChange={handleChange}
            />

            <label htmlFor="pageTags">
              <TitleH3>Tags:</TitleH3>
            </label>
            <div>
              <InputForm
                type="text"
                name="tags"
                id="pageTags"
                value={file.tags}
                onChange={handleChange}
              />
            </div>
          </div>

          <MDEditor
            value={file.text}
            onChange={textInput}
            height={350}
            width={300}
          />
          <div
            style={{
              width: "30%",
              margin: "0 auto",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button onClick={handleSubmit} type="submit">
              Save
            </Button>
            <Button onClick={handleDelete}>Delete</Button>
          </div>
        </Fix>
      </Container>
    </>
  );
}

export default Page;
