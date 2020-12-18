//dependencies
import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

//images
import Avatar from "../../../assets/images/LogoDark.svg";

//css
import "./Profile.css";

//auth
import { AuthContext } from "../../../contexts/authContext";

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
  });

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await api.get("/profile");
        setUser({ ...response.data.user });
      } catch (err) {
        console.error(err);
      }
    }
    fetchUser();
  }, []);

  // 4. "Encaixar" o state no JSX a ser renderizado pelo componente
  return (
    <div className="container">
      <div className="avatar-box">
        <img src={user.avatar} style={{ width: "150px" }} alt="Avatar" />
        <Link to={`/auth/profile/edit`}>
          <button className="edit-button">Edit Profile</button>
        </Link>

        <Link to={`/auth/delete/${user._id}`}>
          <button className="delete-button">Delete Profile</button>
        </Link>
      </div>

      <div className="pages-list">
        <h1>{user.username}</h1>
        <hr></hr>
        <div className="infos-profile">
          <p>
            <strong>E-mail: </strong>
            {user.email}
          </p>
          <p>
            <strong>Cohort: </strong>
            {user.cohort}
          </p>
          <table className="pages">
            <thead>
              <tr>
                <th>Pages: </th>
              </tr>
            </thead>
            <tbody>
              {user.pagesCreated.map((elem) => (
                <tr key={elem._id}>
                  <td className="table-elem">
                    <Link to={`/pages/${elem._id}`}>{elem.title}</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Profile;
