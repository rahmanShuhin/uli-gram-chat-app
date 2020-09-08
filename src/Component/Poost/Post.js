import React, { useEffect, useState } from "react";
import { Avatar, Button } from "@material-ui/core";
import "./Post.css";
import db from "../Firebase";
import firebase from "firebase";
import SelectInput from "@material-ui/core/Select/SelectInput";
import Comments from "../Comments/Comments";
import { useStateValue } from "../StateProvider";
const Post = ({ id, data }) => {
  const [comments, setComments] = useState([]);
  const [input, setInput] = useState("");
  const [{ user }, dispatch] = useStateValue();
  useEffect(() => {
    let unsubscribe;
    if (id) {
      unsubscribe = db
        .collection("posts")
        .doc(id)
        .collection("comments")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) => {
          setComments(snapshot.docs.map((doc) => doc.data()));
        });
    }
    return () => {
      unsubscribe();
    };
  }, []);
  const postComment = (e) => {
    e.preventDefault();

    db.collection("posts").doc(id).collection("comments").add({
      text: input,
      avatar: user.photoURL,
      userName: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setInput("");
  };
  return (
    <div className="post">
      <div className="post__header">
        <Avatar alt={data?.userName} src={data?.avatar}></Avatar>
        <div className="post_top__right">
          <p>
            <strong>{data?.userName}</strong>
          </p>
          <p>{new Date(data.timestamp?.toDate()).toUTCString()}</p>
        </div>
      </div>
      <div className="post__status">
        <p>{data.status}</p>
      </div>
      {data.imgURL && (
        <div className="post__image">
          <img src={data.imgURL && data.imgURL} alt="" />
        </div>
      )}
      <div className="comment__container">
        {comments &&
          comments.map((x) => (
            <Comments
              avatar={x.avatar}
              userName={x.userName}
              text={x.text}
            ></Comments>
          ))}
      </div>
      <div className="post__comment">
        <form onSubmit={postComment}>
          <input
            type="text"
            className="comment__input"
            placeholder="Add Comment...."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button disabled={!input} type="submit">
            Post
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Post;
