import React from "react";
import "./Login.css";
import { TextField, Button } from "@material-ui/core";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import GitHubIcon from "@material-ui/icons/GitHub";
import { Link } from "react-router-dom";
import { provider, auth } from "../Firebase";
import { useStateValue } from "../StateProvider";
import { actionTypes } from "../Reducer";
const Login = () => {
  const [state, dispatch] = useStateValue();
  const login_FaceBook = () => {
    auth
      .signInWithPopup(provider)
      .then((res) => {
        console.log(res);
        dispatch({
          type: actionTypes.SET_USER,
          user: res.user,
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  return (
    <div className="login">
      <div className="login__top">
        <h2>ULI</h2>
        <p>Get Connected</p>
      </div>
      <div className="login__bottom">
        <form>
          <TextField className="login__input" label="E-mail" />
          <TextField className="login__input" label="Password" />
          <Button variant="contained" type="submit">
            Login
          </Button>
        </form>
        <div className="login__option">
          <p>or</p>
          <div className="login__option__icon">
            <FacebookIcon onClick={login_FaceBook}></FacebookIcon>
            <TwitterIcon></TwitterIcon>
            <GitHubIcon></GitHubIcon>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
