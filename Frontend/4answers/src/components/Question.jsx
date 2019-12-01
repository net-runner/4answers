import React, { useState, useEffect } from "react";
import { Elevation } from "@rmwc/elevation";
import "../App.css";
export const Question = ({ data, index, qS, cqS, fin }) => {
  const og = ["A", "B", "C", "D"];
  const [Questions, setQuestions] = useState();
  const Correct = data.questions.filter((item, index) => {
    if (item.correct) return item;
  });

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
  const handleSelection = indor => {
    if (!fin) {
      let xor = [...qS];
      if (data.questions[indor] === Correct[0]) {
        xor[index].correct = true;
      } else {
        xor[index].correct = false;
      }
      xor[index].selected = indor;
      cqS(xor);
      localStorage.setItem(
        "q",
        JSON.stringify({
          questions: xor
        })
      );
    }
  };
  useEffect(() => {
    let xd = localStorage.getItem("q");
    if (xd !== "undefined" && xd !== null) {
      setQuestions(JSON.parse(xd).questions[index].questions);
    } else {
      let Q = data.questions.map((item, indexor) => {
        return item;
      });
      Q = shuffle(Q);
      setQuestions(Q);
    }
  }, []);

  const Qer = ({ item, indor }) => {
    if (qS[index].selected === indor && !fin) {
      return (
        <div
          className="question"
          style={{
            color: "#7C4DFF"
          }}
          key={indor}
          onClick={() => handleSelection(indor)}
        >
          {og[indor]}. {item.value}
        </div>
      );
    } else if (qS[index].selected === indor && fin && qS[index].correct) {
      return (
        <div
          className="question"
          style={{
            color: "#388E3C"
          }}
          key={indor}
          onClick={() => handleSelection(indor)}
        >
          {og[indor]}. {item.value}
        </div>
      );
    } else if (qS[index].selected === indor && fin && !qS[index].correct) {
      return (
        <div
          className="question"
          style={{
            color: "#D32F2F"
          }}
          key={indor}
          onClick={() => handleSelection(indor)}
        >
          {og[indor]}. {item.value}
        </div>
      );
    } else if (
      Correct[0] === data.questions[indor] &&
      fin &&
      !qS[index].correct
    ) {
      return (
        <div
          className="question"
          style={{
            color: "#388E3C"
          }}
          key={indor}
          onClick={() => handleSelection(indor)}
        >
          {og[indor]}. {item.value}
        </div>
      );
    } else {
      return (
        <div
          className="question"
          key={indor}
          onClick={() => handleSelection(indor)}
        >
          {og[indor]}. {item.value}
        </div>
      );
    }
  };
  return (
    <Elevation z={1} wrap>
      <div className="item column">
        <div className="questionTitle">
          {index + 1}. {data.qText}
        </div>
        {Questions &&
          Questions.map((item, indor) => {
            return <Qer key={indor} item={item} indor={indor} />;
          })}
      </div>
    </Elevation>
  );
};
