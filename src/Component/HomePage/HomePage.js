import React, { useState, useEffect } from "react";
import { useStateValue } from "../StateProvider";
import { Avatar, TextField, Card, Button, Switch } from "@material-ui/core";
import PeopleIcon from "@material-ui/icons/People";
import NotificationsIcon from "@material-ui/icons/Notifications";
import SendIcon from "@material-ui/icons/Send";
import "./Homepage.css";
import SelectInput from "@material-ui/core/Select/SelectInput";
import db, { storage } from "../Firebase";
import firebase from "firebase";
import Post from "../Poost/Post";
import { actionTypes } from "../Reducer";
const HomePage = () => {
  const [{ user }, dispatch] = useStateValue();
  const [nish, setNish] = useState("");
  const [input, setInput] = useState("");
  const [status, setStatus] = useState([]);
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const nick = user.displayName;
  const nick_2 = nick.split(" ");
  const postStatus = () => {
    if (image) {
      const uploadImg = storage.ref(`images/${image.name}`).put(image);
      uploadImg.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progress);
        },
        (error) => {
          console.log(error.message);
        },
        () => {
          //complete function
          storage
            .ref("images")
            .child(image.name)
            .getDownloadURL()
            .then((url) => {
              //post to database

              db.collection("posts").add({
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                userName: user?.displayName,
                status: input && input,
                avatar: user?.photoURL,
                imgURL: url,
              });
            });
          setProgress(0);
          setImage(null);
          setStatus([]);
          setInput([]);
        }
      );
    } else {
      db.collection("posts").add({
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        userName: user?.displayName,
        status: input,
        avatar: user?.photoURL,
      });
      setInput([]);
    }
  };
  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setStatus(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
  }, []);
  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };
  const handleChangeSwitch = (event) => {
    dispatch({
      type: actionTypes.SET_USER,
      user: null,
    });
  };
  //console.log(status);
  return (
    <div className="homepage">
      <div className="homepage__header">
        <div className="homepage__header__left">
          <Avatar alt={user?.displayName} src={user?.photoURL}></Avatar>
          <p>{user?.displayName}</p>
        </div>
        <div className="homepage__header__right">
          <Switch
            onChange={handleChangeSwitch}
            color="primary"
            name="checkedB"
            inputProps={{ "aria-label": "primary checkbox" }}
          />
        </div>
      </div>
      <div className="homepage__post">
        <Card>
          <div className="homepage_post__input">
            <div className="homepage__post__input__left">
              <Avatar alt={user?.displayName} src={user?.photoURL}></Avatar>
            </div>
            <TextField
              onChange={(e) => setInput(e.target.value)}
              label={`What's on your mind, ${nick_2[0]}`}
              variant="filled"
              value={input}
              className="homepage_post__input__right"
            />

            <Button
              disabled={!image && !input}
              variant="contained"
              color="primary"
              onClick={postStatus}
            >
              <SendIcon></SendIcon>
            </Button>
          </div>
          <div className="homepage__file">
            <input type="file" onChange={handleChange} />
            <progress value={progress} max="100"></progress>
          </div>
        </Card>
      </div>
      <div className="homepage__post__container">
        {status?.map((x) => (
          <Post key={x.id} id={x.id} data={x.data}></Post>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
