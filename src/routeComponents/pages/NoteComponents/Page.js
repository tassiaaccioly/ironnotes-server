//Dependencies
import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import MDEditor from "@uiw/react-md-editor";
import api from "../../../apis/pagesApi";
import { AuthContext } from "../../../contexts/authContext";

//Styled Components
import {
  Container,
  Fix,
  Button,
  Title,
  Tag,
  TagQueue,
  FixHTML,
} from "./NoteStyles/page";

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

  return (
    <>
      <FixHTML></FixHTML>
      <Container>
        <Fix>
          <header>
            <Title>{file.title}</Title>
            <Tag>
              {file.tags.map((file, i) => {
                return <TagQueue key={i}>{file}</TagQueue>;
              })}
            </Tag>
          </header>
          <MDEditor.Markdown source={file.text} />
          <Link
            to={`/pages/edit/${id}`}
            // onClick={OpenSearch}
            style={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <Button>Edit Note</Button>
          </Link>
        </Fix>
      </Container>
    </>
  );
}

export default Page;
