import React from "react";
import { Link } from "react-router-dom";
import MDEditor from "@uiw/react-md-editor";

import {
  Container,
  FixHTML,
  Fix,
  Title,
  Tag,
  TagQueue,
  Button,
} from "./NoteStyles/page";

function HowTo() {
  return (
    <>
      <FixHTML></FixHTML>
      <Container>
        <Fix>
          <header>
            <Title>Getting Started</Title>
            <Tag>
              <TagQueue>Help</TagQueue>
              <TagQueue>Start</TagQueue>
              <TagQueue>Welcome</TagQueue>
            </Tag>
          </header>
          <MDEditor.Markdown
            source="
            <h2>Welcome to IronNotes</h2>
            <p>
              Welcome to our collective notebook! Here you can create new notes
              that you automatically share with your cohort at Ironhack!
            </p>
            <h3>Where to Begin?</h3>
            <p>
              To start creating notes it's easy! Just click on the blue button
              on the left bottom corner that says 'New Note', this will open
              the notes editor!
            </p>
            <h3>How to edit?</h3>
            <p>
              In the editor you can choose to use markdown laguage, HTML or the
              editor's own text formatting tools.
            </p>
            <p>
              First add a Title, then some tags so you can find yout notes later
              and finally write down your notes in the editor's window! Simple
              as that! The button in the end of the page let's you not only edit bit delete any page if you'd like to. BEWARE though, as collective notebook anyone can edit and delete anyone's notes so be mindful of your choices!
            </p>
            <h3>How can I find my notes?</h3>
            <p>This is a collective notebook so the titles of all the notes will appear on the left side of the screen on the side menu. There you'll be able to find not only your notes but all your cohorts'. To find only your notes you can go to your profile. There you can find a list of all the notes your created</p>
            <h3>Using the search feature!</h3>
            <p>You can also use the search bar to find not only your friends' notes but using the filter you can also search by title and/or tags!</p>
            <h3>Classes' Quotes</h3>
            <p>This app also has a special library to hold the best memes/phrases said during classes and a special button (that little emoji on top) to get a random quote from the ones stored in our database! Use it wisely! (When I say wisely I mean make it funny for everyone!)</p>
            <p>Thank you for making an account, and we hope you share many important (and some not so important) notes with your cohort's mates! Make the best of your time at IronHack! And keep strong it'll all be worth it!</p>"
          />
          <div
            style={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <Link to="/pages/newpage">
              <Button>New Note</Button>
            </Link>
          </div>
        </Fix>
      </Container>
    </>
  );
}

export default HowTo;
