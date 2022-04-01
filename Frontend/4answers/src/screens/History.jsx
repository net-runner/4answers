import React, { useState, useEffect } from "react";
import "../App.css";
import { HistoryItem } from "../components/HistoryItem";
export const History = ({ user }) => {
  const [History, setHistory] = useState([]);
  useEffect(() => {
    fetch("http://localhost/4answers/server/api/h.php", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: user.username
      })
    })
      .then(result => result.json())
      .catch(err => console.log(err))
      .then(data => {
        if (data.data) {
          let datois = data.data.map((item, index) => {
            let questions = JSON.parse(item.questions);
            let corrects = questions.filter((item, index) => item.correct);
            return { ...item, corrects, questions };
          });
          setHistory(datois);
        }
      });
  }, [user.username]);
  return (
    <div className="column" style={{}}>
      {History.map((item, index) => {
        return <HistoryItem key={index} item={item} index={index} />;
      })}
    </div>
  );
};
