import React, { useState, useEffect } from "react";
import "../App.css";
import { Elevation } from "@rmwc/elevation";
import { Leaderquestion } from "../components/Leaderquestion";
import { FaRegTrashAlt } from "react-icons/fa";
import IconButton from "@material-ui/core/IconButton";
export const Management = () => {
  const [Selected, setSelected] = useState(false);
  const [Users, setUsers] = useState([]);
  const [Questions, setQuestions] = useState([]);
  const handleUD = us => {
    fetch("http://localhost/4answers/server/api/du.php", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: us
      })
    })
      .then(result => {
        fetch("http://localhost/4answers/server/api/au.php", {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          }
        })
          .then(result => result.json())
          .catch(err => console.log(err))
          .then(data => {
            if (data.data) setUsers(data.data);
          });
      })
      .catch(err => console.log(err));
  };
  const handleQD = () => {};
  useEffect(() => {
    fetch("http://localhost/4answers/server/api/aq.php", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(result => result.json())
      .catch(err => console.log(err))
      .then(data => {
        if (data.data) setQuestions(data.data);
      });
    fetch("http://localhost/4answers/server/api/au.php", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(result => result.json())
      .catch(err => console.log(err))
      .then(data => {
        if (data.data) setUsers(data.data);
      });
  }, []);
  return (
    <div className="column">
      <div className="row flexcenter" style={{ marginBottom: "20px" }}>
        <div
          style={{
            width: "20vw",
            marginRight: 20,
            padding: 5,
            borderRadius: 10,
            backgroundColor: !Selected ? "#673ab7" : "#757575"
          }}
          onClick={() => setSelected(!Selected)}
        >
          USERS
        </div>
        <div
          style={{
            width: "20vw",
            marginRight: 20,
            padding: 5,
            borderRadius: 10,
            backgroundColor: !Selected ? "#757575" : "#673ab7"
          }}
          onClick={() => setSelected(!Selected)}
        >
          QUESTIONS
        </div>
      </div>
      {!Selected
        ? Users.map((item, index) => {
            return (
              <Elevation key={index} z={1} wrap>
                <div
                  key={index}
                  className="item row"
                  style={{
                    marginTop: 20,
                    justifyContent: "space-between",
                    alignItems: "space-between",
                    justifyItems: "center",
                    color: "#757575",
                    fontWeight: "400"
                  }}
                >
                  <div
                    className=" normalText"
                    style={{
                      display: "flex",
                      alignContent: "center",
                      justifyContent: "center",
                      alignItems: "center"
                    }}
                  >
                    {index + 1}.
                  </div>
                  <div
                    className="flexcenter normalText"
                    style={{ display: "flex", flex: 3 }}
                  >
                    {item.username}
                  </div>
                  <div
                    className="flexcenter normalText"
                    style={{ display: "flex", flex: 1 }}
                  >
                    {item.registerAt}
                  </div>
                  <div
                    className="flexcenter normalText"
                    style={{ display: "flex", flex: 1 }}
                  >
                    {item.correctA}
                  </div>
                  <div
                    className="flexcenter normalText"
                    style={{ display: "flex", flex: 1 }}
                  >
                    {item.answers}
                  </div>
                  <div
                    className="flexcenter normalText"
                    style={{ display: "flex", flex: 1 }}
                  >
                    {parseFloat(item.userp).toFixed(2)}%
                  </div>
                  <IconButton onClick={() => handleUD(item.username)}>
                    <FaRegTrashAlt color={"#673ab7"} size={28} />
                  </IconButton>
                </div>
              </Elevation>
            );
          })
        : Questions.map((item, index) => {
            return (
              <Leaderquestion
                hQD={handleQD}
                isManagement
                item={item}
                index={index}
                key={index}
              />
            );
          })}
    </div>
  );
};
