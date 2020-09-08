import React from "react";
import { Avatar } from "@material-ui/core";
import "./Comments.css";
const Comments = ({ avatar, text, userName }) => {
  console.log(avatar, text);
  return (
    <div className="comment">
      <Avatar src={avatar} alt={userName}></Avatar>
      <p>
        <strong>{userName}</strong> : {text}
      </p>
    </div>
  );
};

export default Comments;
