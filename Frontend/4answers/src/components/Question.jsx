import React, { useState, useEffect } from "react";
import { Elevation } from "@rmwc/elevation";
import "../App.css";
export const Question = ({ data, index, qS, cqS, fin, isLeaderboard }) => {
  const og = ["A", "B", "C", "D"];
  const [Questions, setQuestions] = useState();
  const Correct = data.questions.filter((item, index) => {
    if (item.correct) return item;
  });
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
    if (xd !== "undefined" && xd !== null && !fin) {
      setQuestions(JSON.parse(xd).questions[index].questions);
    } else {
      let Q = [...data.questions];
      setQuestions(Q);
    }
  }, []);

  const Qer = ({ item, indor }) => {
    if (qS[index].selected === indor && !fin) {
      return (
        <div
          className="question f1"
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
          className="question f1"
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
          className="question f1"
          style={{
            color: "#673ab7"
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
          className="question f1"
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
          className="question f1"
          style={{
            color: "#388E3C"
          }}
          key={indor}
          onClick={() => handleSelection(indor)}
        >
          {og[indor]}. {item.value}
        </div>
      );
    } else if (
      Correct[0] !== data.questions[indor] &&
      fin &&
      !qS[index].correct
    ) {
      return (
        <div
          className="question f1"
          style={{
            color: "#D32F2F"
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
          className="question f1"
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
      <div className="item column f1">
        {!isLeaderboard && (
          <div className="questionTitle">
            {index + 1}. {data.qText}
          </div>
        )}

        {Questions &&
          Questions.map((item, indor) => {
            return <Qer key={indor} item={item} indor={indor} />;
          })}
      </div>
    </Elevation>
  );
};
