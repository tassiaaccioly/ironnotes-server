//dependencies
import React, { useState, useEffect, useContext } from "react";

//css
import "./Profile.css";

//auth
import { AuthContext } from "../../../contexts/authContext";

//Styled Components
import { InputForm } from "../../../routeComponents/pages/NoteComponents/NoteStyles/events";
import {
  Title,
  LabelH3,
} from "../../../routeComponents/pages/NoteComponents/NoteStyles/page";

//components
import FileInput from "../../../components/FileInput";

//axios
import api from "../../../apis/pagesApi";

function Profile(props) {
  useContext(AuthContext);

  const [user, setUser] = useState({
    username: "",
    cohort: "",
    pagesCreated: [],
    email: "",
    avatar: "",
    _id: "",
  });

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await api.get("/profile");
        console.log(response);
        setUser({ ...response.data.user });
      } catch (err) {
        console.error(err);
      }
    }
    fetchUser();
  }, []);

  async function handleFileUpload(file) {
    try {
      const uploadData = new FormData();

      uploadData.append("avatar", file);

      const response = await api.post("/file-upload", uploadData);

      return response.data.fileUrl;
    } catch (err) {
      console.error(err);
    }
  }

  async function handleClick() {
    try {
      if (typeof user.avatar !== "string") {
        console.log(typeof user.avatar);

        const uploadedImageUrl = await handleFileUpload(user.avatar);

        console.log(uploadedImageUrl);

        await api.patch(`/profile/${user._id}`, {
          ...user,
          avatar: uploadedImageUrl,
        });
      }

      await api.patch(`/profile/${user._id}`, { ...user });

      props.history.push("/auth/profile");
    } catch (err) {
      console.error(err);
    }
  }

  function handleChange(event) {
    if (event.currentTarget.files) {
      return setUser({
        ...user,
        [event.currentTarget.name]: event.currentTarget.files[0],
      });
    }
    setUser({
      ...user,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  }

  // 4. "Encaixar" o state no JSX a ser renderizado pelo componente
  return (
    <div className="container">
      <div className="avatar-box">
        <img src={user.avatar} style={{ width: "150px" }} alt="Avatar" />
        <button onClick={handleClick} className="edit-button">
          Save Profile
        </button>
      </div>

      <div className="pages-list">
        <Title>Edit Profile</Title>
        <hr></hr>
        <div className="edit-profile">
          <LabelH3>Username:</LabelH3>
          <InputForm
            id="username"
            name="username"
            type="text"
            value={user.username}
            onChange={handleChange}
          />
          <LabelH3>E-mail:</LabelH3>
          <InputForm
            id="email"
            name="email"
            type="text"
            value={user.email}
            onChange={handleChange}
          />
          <LabelH3>Avatar</LabelH3>
          <FileInput
            label="Choose an avatar or photo"
            name="avatar"
            id="signupFormAvatar"
            value={user.avatar}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
}

export default Profile;
