import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import api from "../../../../../apis/pagesApi";

import {
  Container,
  Fix,
  FixHTML,
  TagSearch,
  FormButton,
} from "../../NoteStyles/page";
import { InputForm } from "../../NoteStyles/events";
import CheckInput from "../../../../../components/CheckInput";

import "./SearchPage.css";

function SearchPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const [notes, setNotes] = useState([
    {
      title: "",
      tags: [],
      creatorUser: {},
    },
  ]);

  const [notesFilter, setNotesFilter] = useState([]);

  const [check, setCheck] = useState({
    title: false,
    tags: false,
    creator: false,
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await api.get("/pages");

        setNotes([...response.data]);
      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function awaitRender() {
      if (notesFilter.length === 0) {
        await renderFilter();
      }
    }
    awaitRender();
  }, [notesFilter]);

  function handleClick() {
    setNotesFilter([]);
  }

  async function renderFilter() {
    try {
      const response = await api.get("/pages");

      if (check.title) {
        const filteredTitle = response.data.filter((note) =>
          note.title.toLowerCase().includes(searchTerm)
        );
        setNotesFilter([...notesFilter, ...filteredTitle]);
      }

      if (check.tags) {
        const filteredTags = response.data.filter((note) => {
          let search = false;
          note.tags.forEach((tag) => {
            if (tag.includes(searchTerm)) {
              search = true;
            }
          });
          return search;
        });
        setNotesFilter([...notesFilter, ...filteredTags]);
      }

      if (check.creator) {
        const filteredCreator = response.data.filter((note) =>
          note.creatorUser.username.toLowerCase().includes(searchTerm)
        );
        setNotesFilter([...notesFilter, ...filteredCreator]);
      }
    } catch (err) {
      console.error(err);
    }
  }

  function handleChange(event) {
    setSearchTerm(event.currentTarget.value.toLowerCase());
  }

  function handleCheckChange(event) {
    setCheck({
      ...check,
      [event.currentTarget.name]: event.currentTarget.checked,
    });
  }

  return (
    <>
      <FixHTML></FixHTML>
      <Container>
        <Fix>
          <div id="SearchBarPopUpOne">
            <InputForm
              type="text"
              name="searchinput"
              id="searchInputForm"
              placeholder="Enter search term..."
              value={searchTerm}
              onChange={handleChange}
            ></InputForm>
            <FormButton style={{ marginLeft: "30px" }} onClick={handleClick}>
              Search
            </FormButton>
          </div>
          <div className="check-container">
            <CheckInput
              id="checkInputTitle"
              name="title"
              checked={check.title}
              onChange={handleCheckChange}
              label="Title"
            />
            <CheckInput
              id="checkInputTags"
              name="tags"
              checked={check.tags}
              onChange={handleCheckChange}
              label="Tags"
            />
            <CheckInput
              id="checkInputCreator"
              name="creator"
              checked={check.creator}
              onChange={handleCheckChange}
              label="Creator"
            />
          </div>
          <div className="searchtable-container">
            <table className="search-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Tags</th>
                  <th>Creator</th>
                </tr>
              </thead>
              {notesFilter.length === 0
                ? notes.map((note) => (
                    <tr>
                      <td>
                        <Link className="table-link" to={`/pages/${note._id}`}>
                          {note.title}
                        </Link>
                      </td>
                      <td>
                        {note.tags.map((tag, i) => (
                          <Link to="/pages/tag">
                            <TagSearch key={i}>{tag}</TagSearch>
                          </Link>
                        ))}
                      </td>
                      <td>{note.creatorUser.username}</td>
                    </tr>
                  ))
                : notesFilter.map((note) => (
                    <tr>
                      <td>
                        <Link className="table-link" to={`/pages/${note._id}`}>
                          {note.title}
                        </Link>
                      </td>
                      <td>
                        {note.tags.map((tag, i) => (
                          <Link to="/pages/tag">
                            <TagSearch key={i}>{tag}</TagSearch>
                          </Link>
                        ))}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {note.creatorUser.username}
                      </td>
                    </tr>
                  ))}
            </table>
          </div>
        </Fix>
      </Container>
    </>
  );
}

export default SearchPage;
