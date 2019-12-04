import React, { useState, useEffect } from "react";
import "../App.css";
import { Elevation } from "@rmwc/elevation";
export const Leaderboard = () => {
  const [Selected, setSelected] = useState(false);
  const [Users, setUsers] = useState([]);
  const [Questions, setQuestions] = useState([]);
  useEffect(() => {
    fetch("http://localhost/4answers/server/api/tq.php", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(result => result.json())
      .catch(err => console.log(err))
      .then(data => {
        setQuestions(data.data);
      });
    fetch("http://localhost/4answers/server/api/tu.php", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(result => result.json())
      .catch(err => console.log(err))
      .then(data => {
        setUsers(data.data);
      });
  }, []);
  return (
    <div className="column">
      <div className="row flexcenter">
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
                  <div style={{ display: "flex", flex: 1 }}>{index + 1}.</div>
                  <div
                    className="flexcenter"
                    style={{ display: "flex", flex: 1 }}
                  >
                    {item.username}
                  </div>
                  <div
                    className="flexcenter"
                    style={{ display: "flex", flex: 1 }}
                  >
                    {item.registerAt}
                  </div>
                  <div
                    className="flexcenter"
                    style={{ display: "flex", flex: 1 }}
                  >
                    {parseFloat(item.userp).toFixed(2)}%
                  </div>
                </div>
              </Elevation>
            );
          })
        : Questions.map((item, index) => {
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
                  <div style={{ display: "flex", flex: 1 }}>{index + 1}.</div>
                  <div
                    className="flexcenter"
                    style={{ display: "flex", flex: 3 }}
                  >
                    {item.qText}
                  </div>
                  <div
                    className="flexcenter"
                    style={{ display: "flex", flex: 1 }}
                  >
                    {item.createdAt}
                  </div>
                  <div
                    className="flexcenter"
                    style={{ display: "flex", flex: 1 }}
                  >
                    {parseFloat(item.qp).toFixed(2)}%
                  </div>
                </div>
              </Elevation>
            );
          })}
    </div>
  );
};