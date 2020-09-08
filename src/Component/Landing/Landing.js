import React from "react";
import "./Landing.css";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
const Landing = () => {
  return (
    <div className="landing">
      <div className="landing__top">
        <h1>ULI</h1>
        <p>Always Connect With Your Friends and Family</p>
      </div>
      <div className="landing__bottom">
        <Button variant="contained">
          <Link
            style={{
              textDecoration: "none",
              display: "inline-block",
              width: "100%",
              color: "#3b63ff",
            }}
            to="/login"
          >
            Sign In
          </Link>
        </Button>

        <Button variant="contained">
          <Link
            style={{
              textDecoration: "none",
              display: "inline-block",
              width: "100%",
              color: "white",
            }}
          >
            Sign Up
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default Landing;
