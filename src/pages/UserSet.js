import React from "react";
import firebase from "../database/firebase";
import "firebase/auth";

function UserSet() {
  const [userName, setUserName] = React.useState("");
  return (
    <div>
      <h2> UserSet here!</h2>
    </div>
  );
}

export default UserSet;
