import React, { useState, useEffect } from "react";
import { Elevation } from "@rmwc/elevation";
import "../App.css";
export const Question = ({
  data,
  index,
  qS,
  cqS,
  fin,
  isLeaderboard,
  isEditable
}) => {
  const og = ["A", "B", "C", "D"];
  const [Questions, setQuestions] = useState();
  const Correct = data.questions.filter((item, index) => {
    if (item.correct) return item;
  });
  if (isEditable) {
    console.log(data);
  }
  const handleSelection = indor => {
    if (!fin) {
      let xor = [...qS];
      if (!isLeaderboard && !isEditable) {
        if (data.questions[indor] === Correct[0]) {
          xor[index].correct = true;
        } else {
          xor[index].correct = false;
        }
        xor[index].selected = indor;
      } else {
        xor[index].questions = xor[index].questions.map((item, indyk) => {
          return { ...item, correct: false };
        });
        xor[index].questions[indor].correct = true;
      }
      cqS(xor);
      if (!isLeaderboard && !isEditable) {
        localStorage.setItem(
          "q",
          JSON.stringify({
            questions: xor
          })
        );
      }
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
    if (!isLeaderboard) {
      if (qS[index].selected === indor && !fin) {
        return (
          <div
            className="question f1"
            style={{
              color: "#7C4DFF"
            }}
            key={item}
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
            key={item}
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
            key={item}
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
            key={item}
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
            key={item}
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
            key={item}
            onClick={() => handleSelection(indor)}
          >
            {og[indor]}. {item.value}
          </div>
        );
      } else {
        return (
          <div
            className="question f1"
            key={item}
            onClick={() => handleSelection(indor)}
          >
            {og[indor]}. {item.value}
          </div>
        );
      }
    } else {
      if (!qS[index].questions[indor].correct) {
        return (
          <div
            className="question f1"
            style={{
              color: "#D32F2F"
            }}
            key={item}
            onClick={() => handleSelection(indor)}
          >
            {og[indor]}. {item.value}
          </div>
        );
      } else {
        return (
          <div
            className="question f1"
            style={{
              color: "#388E3C"
            }}
            key={item}
            onClick={() => handleSelection(indor)}
          >
            {og[indor]}. {item.value}
          </div>
        );
      }
    }
  };
  return (
    <Elevation z={1} wrap>
      <div className="item column">
        {!isLeaderboard && (
          <div className="questionTitle">
            {index + 1}. {data.qText}
          </div>
        )}
        {isEditable && <div className="questionTitle">
          QUESTION: {data.qText}
        </div>}

        {Questions &&
          Questions.map((item, indor) => {
            return <Qer key={indor} item={item} indor={indor} />;
          })}
      </div>
    </Elevation>
  );
};
