import React, { useState, useEffect } from "react";
import SERVER_URL from "../constants";
import "../App.css";
import { HistoryItem } from "../components/HistoryItem";
export const History = ({ user }) => {
  const [History, setHistory] = useState([]);
  useEffect(() => {
    fetch(SERVER_URL + "h.php", {
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
        console.log("H---");
        console.log(data)
        if (data) {
          let datois = data.map((item, index) => {

            var dec_data = JSON.parse(item.questions)
            let questions = dec_data;
            console.log(questions);
            let corrects = questions.filter((item, index) => item.correct);
            return { ...item, corrects, questions };
          });
          setHistory(datois);
        }
      });
  }, [user]);
  return (
    <div className="column" style={{}}>
      {History.map((item, index) => {
        return <HistoryItem key={index} item={item} index={index} />;
      })}
    </div>
  );
};
