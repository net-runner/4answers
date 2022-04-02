import React, { useState, useEffect, useCallback } from "react";
import "../App.css";
import { Question } from "../components/Question";
import { Buttonor } from "../components/Buttonor";
import SERVER_URL from "../constants";
export const TestPanel = ({ user, sU }) => {
  const [Corrects, setCorrects] = useState(0);
  const [Finished, setFinished] = useState(false);
  const [answer, setAnswer] = useState([]);
  const [Questions, setQuestions] = useState([]);
  const shuffle = array => {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  };
  const handleFinish = () => {
    let flag = false;
    let answers = Questions.map((item, index) => {
      if (item.selected === undefined) flag = true;
      return {
        selected: item.selected,
        id: item.id,
        correct: item.correct
      };
    });
    if (flag)
      if (
        !window.confirm(
          "There are questions left without answers. Do you realy want to finish?"
        )
      )
        return 0;
    setAnswer(answers);
    let crcts = answers.filter((item, index) => item.correct);
    setCorrects(crcts.length);
    setFinished(true);
    localStorage.removeItem("q");
    fetch(SERVER_URL + "U.php", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: user.username,
        answers,
        stats: {
          corrects: crcts.length,
          answers: answers.length
        }
      })
    })
      .then(response => response.json())
      .then(data => {
        console.log("U---");
        console.log(data);
        let xd = { ...user };
        xd.userp = data.cP;
        sU(xd);
        localStorage.setItem("user", JSON.stringify(xd));
      })
      .catch(err => console.log("Error: " + err));
    fetch(SERVER_URL + "ch.php", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: user.username,
        questions: { data: encodeURIComponent(JSON.stringify(Questions)) }
      })
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(err => console.log("Error: " + err));
  };

  const getQuestions =
    useCallback(
      () => {
        fetch(SERVER_URL + "Q.php", {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          }
        })
          .then(result => result.json())
          .catch(err => console.log(err))
          .then(data => {
            if (data) {
              if (data.data) {
                let datois = data.data.map((item, index) => {
                  return { ...item, questions: shuffle(item.questions) };
                });
                setQuestions(datois);
                localStorage.setItem(
                  "q",
                  JSON.stringify({
                    questions: datois
                  })
                );
              }
            }
          });
      },
      [],
    )

  useEffect(() => {
    let xd = localStorage.getItem("q");
    if (xd !== "undefined" && xd !== null) {
      setQuestions(JSON.parse(xd).questions);
    } else {
      getQuestions();
    }
  }, [getQuestions]);
  const Again = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => {
      window.location.reload();
      getQuestions();
      setFinished(false);
    }, 500);
  };
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
