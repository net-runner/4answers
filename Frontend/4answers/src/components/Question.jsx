import React, { useState, useEffect } from "react";
import { Elevation } from "@rmwc/elevation";
import "../App.css";
export const Question = ({ data, index }) => {
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

  const Correct = data.questions.filter((item, indexor) => {
    if (item.correct) return item;
  });
  const handleSelection = indor => {
    setSelected(indor);
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
          Questions.map((item, index) => {
            return (
              <div
                className="question"
                style={{ color: Selected === index && "#7C4DFF" }}
                key={index}
                onClick={() => handleSelection(index)}
              >
                {og[index]}. {item.value}
              </div>
            );
          })}
      </div>
    </Elevation>
  );
};
