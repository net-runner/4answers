import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import { FiLogOut } from "react-icons/fi";
import { FaUser } from "react-icons/fa";
import { Elevation } from "@rmwc/elevation";
const StyledButton = withStyles({
  root: {
    width: "13vw",
    borderRadius: 3,
    border: 0,
    backgroundColor: "#673ab7",
    height: 48,
    padding: "0 30px",
    marginTop: "20px",
    "&:hover": {
      backgroundColor: "#7C4DFF"
    }
  },

  label: {
    textTransform: "capitalize",
    fontSize: "15px",
    color: "#212121"
  }
})(Button);
const StyledInput = withStyles({
  root: {
    margin: "20px",
    width: "20vw",
    "& .MuiInputBase-root": { color: "#fff" },
    "& label.Mui-focused": {
      color: "#7C4DFF"
    },
    "& .MuiInputLabel-root": {
      borderColor: "#673ab7",
      color: "#673ab7"
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#673ab7",
        borderWidth: 2
      },
      "&:hover fieldset": {
        borderColor: "#7C4DFF",
        borderWidth: 3
      },
      "&.Mui-focused fieldset": {
        borderColor: "#7C4DFF",
        borderWidth: 3
      }
    }
  }
})(TextField);
const StyledText = withStyles({})(TextField);
function App() {
  const [user, setUser] = useState();
  const [uError, setuError] = useState(false);
  const [pError, setpError] = useState(false);
  const [pMatch, cpMatch] = useState(false);
  const [username, cUsername] = useState("");
  const [password, cPassword] = useState("");
  useEffect(() => {
    let xd = localStorage.getItem("user");
    setUser(JSON.parse(xd));
  }, [1]);
  const handleLogout = () => {
    localStorage.clear();
    setUser();
  };
  const handleLR = () => {
    if (username == "" || username.length < 6) {
      setuError(true);
    }
    if (password == "" || password.length < 6) {
      setpError(true);
    }
    if (!uError && !pError) {
      fetch("http://localhost/4answers/server/api/login.php", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username,
          password
        })
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          if (data.result === "Success.") {
            localStorage.setItem(
              "user",
              JSON.stringify({ username, userp: data.userp })
            );
            setUser({ username, userp: data.userp });
          } else if (data.message === "User does not exist.") {
            fetch("http://localhost/4answers/server/api/register.php", {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                username,
                password
              })
            })
              .then(response => response.json())
              .then(data => {
                if (data.result === "Success.") {
                  localStorage.setItem(
                    "user",
                    JSON.stringify({ username, userp: data.userp })
                  );
                  setUser({ username, userp: data.userp });
                }
              });
          } else if (data.message === "Passwords does not match.") {
            cpMatch(true);
          }
        })
        .catch(error => console.log(error));
    }
  };
  const uChange = event => {
    let val = event.target.value;
    val.length < 6 ? setuError(true) : setuError(false);
    cUsername(val);
  };
  const pChange = event => {
    let val = event.target.value;
    val.length < 6 ? setpError(true) : setpError(false);
    cPassword(val);
  };
  return (
    <div className="App">
      <header className="App-header">
        {user ? (
          <>
            <Elevation z={1} wrap>
              <div className="header">
                <h1 onClick={() => console.log(user)} className="title-text">
                  4answers
                </h1>
                <div
                  className="userDiv"
                  style={{ flexDirection: "row", marginRight: "1.2vw" }}
                >
                  <div
                    style={{ marginRight: "1vw" }}
                    className="column nomargin flexcenter"
                  >
                    <div className="row nomargin flexcenter">
                      <FaUser color={"#673ab7"} />
                      <p
                        className="nomargin"
                        style={{ marginLeft: "1vw", fontSize: "1.7wv" }}
                      >
                        {user.username}
                      </p>
                    </div>
                    <p
                      className="nomargin"
                      style={{ color: "#fff", fontSize: "1.3vw" }}
                    >
                      {user.userp}% correct
                    </p>
                  </div>
                  <IconButton onClick={() => handleLogout()}>
                    <FiLogOut color={"#673ab7"} size={28} />
                  </IconButton>
                </div>
              </div>
            </Elevation>
            <Router>
              <div className="nav"></div>
              <Router></Router>
            </Router>
          </>
        ) : (
          <div className="login-div">
            <Elevation z={1} wrap>
              <div
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  display: "flex",
                  padding: "40px",
                  flexDirection: "row"
                }}
              >
                <div
                  className="login-div"
                  style={{
                    flexDirection: "column"
                  }}
                >
                  <div
                    className="login-box"
                    style={{ display: "flex", flexDirection: "column" }}
                  >
                    <StyledInput
                      error={uError}
                      variant={"outlined"}
                      label="Username"
                      value={username}
                      onChange={value => uChange(value)}
                      helperText={uError && "Use atleast 6 characters"}
                    />
                    <StyledInput
                      error={pError}
                      variant={"outlined"}
                      label="Password"
                      value={password}
                      onChange={value => pChange(value)}
                      type="password"
                      helperText={pError && "Use atleast 6 characters"}
                    />
                    <StyledButton
                      onClick={() => handleLR()}
                      variant="contained"
                    >
                      Login
                    </StyledButton>
                    {pMatch && (
                      <p style={{ color: "red" }}>Password does not match!</p>
                    )}
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
            </Elevation>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
