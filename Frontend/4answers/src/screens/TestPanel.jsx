import React, { useState, useEffect } from "react";
import "../App.css";
import { Question } from "../components/Question";
import { Buttonor } from "../components/Buttonor";
export const TestPanel = ({ user }) => {
  const [Corrects, setCorrects] = useState(0);
  const [Finished, setFinished] = useState(false);
  const [answer, setAnswer] = useState([]);
  const [Questions, setQuestions] = useState([]);
  const getCategories = () => {};
  const handleFinish = () => {
    let flag = false;
    let answers = Questions.map((item, index) => {
      if (item.selected === undefined) flag = true;
      return { selected: item.selected, id: item.id, correct: item.correct };
    });
    if (flag)
      if (
        !window.confirm(
          "There are questions left without answers. Do you realy want to finish?"
        )
      )
        return 0;
    setAnswer(answers);
    let crcts = answers.filter((item, index) => {
      if (item.correct) return item;
    });
    setCorrects(crcts.length);
    setFinished(true);
    //localStorage.removeItem('q');
    fetch("http://localhost/4answers/server/api/u.php", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: user.username,
        stats: {
          answers: answer,
          corrects: Corrects,
          failures: answers.length - Corrects
        }
      })
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(err => console.log("Error: " + err));
  };

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
  const Again = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    getQuestions();
    setFinished(false);
    window.location.reload();
  };
  const calculateOutcome = () => {};
  return (
    <div className="column">
      <div className=""></div>
      {Questions ? (
        <>
          {Questions.map((item, index) => {
            return (
              <Question
                key={index}
                data={item}
                index={index}
                cqS={setQuestions}
                qS={Questions}
                fin={Finished}
              />
            );
          })}
          {!Finished ? (
            <Buttonor text={"Finish test"} func={handleFinish} />
          ) : (
            <>
              <div style={{ color: "#757575", fontSize: "2.3vw" }}>
                Correct answers {Corrects} / {answer.length} (
                {parseFloat(parseFloat(Corrects / answer.length) * 100)}%)
              </div>
              <Buttonor text={"Again?"} func={Again} />
            </>
          )}
        </>
      ) : null}
    </div>
  );
};
