import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
const StyledButton = withStyles({
  root: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    borderRadius: 3,
    border: 0,
    color: "white",
    height: 48,
    padding: "0 30px",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)"
  },
  label: {
    textTransform: "capitalize"
  }
})(Button);

function App() {
  const [user, setUser] = useState();
  const handleLR = () => {};
  return (
    <div className="App">
      <header className="App-header">
        {user ? (
          <>
            <div className="header">
              <h1 className="title-text">4answers</h1>
            </div>
            <Router>
              <div className="nav"></div>
              <Router></Router>
            </Router>
          </>
        ) : (
          <div className="login-div">
            <div
              style={{ width: "94vw", display: "flex", flexDirection: "row" }}
            >
              <div
                className="login-div mdc-elevation--z5"
                style={{ flexDirection: "column" }}
              >
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <TextField
                    variant={"outlined"}
                    label="Username"
                    color={"#673ab7"}
                  />
                  <TextField
                    variant={"outlined"}
                    label="Password"
                    color={"#673ab7"}
                  />
                  <StyledButton>XD</StyledButton>
                </div>
              </div>
              <div
                className="welcome-div"
                style={{
                  flexDirection: "column"
                }}
              >
                <h1 className="login-text">4answers</h1>
                <h1 className="fancy-text">App for performing tests</h1>
              </div>
            </div>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
