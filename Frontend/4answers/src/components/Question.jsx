import React, { useState, useEffect } from "react";
import { Elevation } from "@rmwc/elevation";
import "../App.css";
export const Question = ({ data, index, qS, cqS }) => {
  const [Selected, setSelected] = useState();
  const [Questions, setQuestions] = useState();
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
    let xor = [...qS];
    xor[index].selected = indor;
    cqS(xor);
    localStorage.setItem(
      "q",
      JSON.stringify({
        questions: xor
      })
    );
  };
  useEffect(() => {
    let Q = data.questions.map((item, indexor) => {
      return item;
    });
    Q = shuffle(Q);
    setQuestions(Q);
  }, []);
  const og = ["A", "B", "C", "D"];
  return (
    <Elevation z={1} wrap>
      <div className="item column">
        <div className="questionTitle">
          {index + 1}. {data.qText}
        </div>
        {Questions &&
          Questions.map((item, indor) => {
            return (
              <div
                className="question"
                style={{
                  color: qS[index].selected === indor && "#7C4DFF"
                }}
                key={indor}
                onClick={() => handleSelection(indor)}
              >
                {og[indor]}. {item.value}
              </div>
            );
          })}
      </div>
    </Elevation>
  );
};
