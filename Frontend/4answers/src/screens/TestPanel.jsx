import React, { useState, useEffect } from "react";
import "../App.css";
import { Question } from "../components/Question";
export const TestPanel = () => {
  const [Questions, setQuestions] = useState([]);
  const handleSelection = (dagane, index) => {
    let questionibus = [...Questions];
    questionibus[dagane].selected = index;
  };
  const getCategories = () => {};
  const getQuestions = () => {
    fetch("http://localhost/4answers/server/api/q.php", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(result => result.json())
      .catch(err => console.log(err))
      .then(data => {
        setQuestions(data.data);
        localStorage.setItem(
          "q",
          JSON.stringify({
            questions: data.data
          })
        );
        console.log(data.data);
      });
  };
  useEffect(() => {
    let xd = localStorage.getItem("q");
    if (xd !== "undefined" && xd !== null) {
      setQuestions(JSON.parse(xd).questions);
    } else {
      getQuestions();
    }
  }, []);
  const calculateOutcome = () => {};
  return (
    <div className="column">
      <div className=""></div>
      {Questions
        ? Questions.map((item, index) => {
            return (
              <Question
                key={index}
                data={item}
                index={index}
                cqS={setQuestions}
                qS={Questions}
              />
            );
          })
        : null}
    </div>
  );
};
