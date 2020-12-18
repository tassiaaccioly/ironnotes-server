import React, { useEffect } from "react";
import api from "../../../apis/pagesApi";

function UserDelete(props) {
  const { id } = props.match.params;

  useEffect(() => {
    async function deleteUser() {
      try {
        await api.delete(`/profile/${id}`);
        props.history.push("/");
      } catch (err) {
        console.error(err);
      }
    }
    deleteUser();
  }, [id, props.history]);

  return <div>Deleting...</div>;
}

export default UserDelete;
