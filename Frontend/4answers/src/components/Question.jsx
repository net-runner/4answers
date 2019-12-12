import React, { useState, useEffect } from "react";
import { Elevation } from "@rmwc/elevation";
import "../App.css";
import { Inp } from "./Inp";
export const Question = ({
  data,
  index,
  qS,
  cqS,
  fin,
  isLeaderboard,
  isEditable,
  isQuestion,
  hun
}) => {
  const og = ["A", "B", "C", "D"];
  const [Questions, setQuestions] = useState();
  const Correct = data.questions.filter((item, index) => {
    if (item.correct) return item;
  });
  const hE = (value, ind) => {
    let elonbina = [...qS]
    elonbina[0].questions[ind].value = value
    cqS(elonbina)
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
      } else if (isEditable && !isQuestion) {
        xor[index].questions = xor[index].questions.map((item, indyk) => {
          return { ...item, correct: false };
        });
        xor[index].questions[indor].correct = true;
      } else {
        xor = xor.map((item, index) => {
          return { ...item, correct: false };
        })
        xor[indor].correct = true;
        hun(xor, data.id, "questions")
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
      if (isEditable && !isQuestion) {
        if (!qS[index].questions[indor].correct) {
          return (
            <div
              className="question f1"
              style={{
                color: "#D32F2F"
              }}
              key={indor}
            >
              <div onClick={() => handleSelection(indor)}>  {og[indor]}. </div><Inp color={"#D32F2F"} valium={qS[0].questions[indor].value} cqS={hE} indor={indor} />
            </div>
          );
        } else {
          return (
            <div
              className="question f1"
              style={{
                color: "#388E3C"
              }}
              key={indor}
            >
              <div onClick={() => handleSelection(indor)}>  {og[indor]}. </div><Inp color={"#388E3C"} valium={qS[0].questions[indor].value} cqS={hE} indor={indor} />
            </div>
          );
        }
      } else if (isQuestion) {
        if (!qS[indor].correct) {
          return (
            <div
              className="question f1"
              style={{
                color: "#D32F2F"
              }}
              key={indor}
            >
              <div onClick={(e) => {
                e.stopPropagation()
                handleSelection(indor)
              }}>  {og[indor]}. </div><Inp color={"#D32F2F"} valium={qS[indor].value} cqS={hun} us={qS} indor={indor} isQ data={data} />
            </div>
          );
        } else {
          return (
            <div
              className="question f1"
              style={{
                color: "#388E3C"
              }}
              key={indor}
            >
              <div onClick={(e) => {
                e.stopPropagation()
                handleSelection(indor)
              }}>  {og[indor]}. </div><Inp color={"#388E3C"} valium={qS[indor].value} cqS={hun} us={qS} indor={indor} isQ data={data} />
            </div>
          );
        }
      } else {
        if (!qS[indor].correct) {
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
              style={{
                color: "#388E3C"
              }}
              key={indor}
              onClick={() => handleSelection(indor)}
            >
              {og[indor]}. {item.value}
            </div>
          );
        }
      }
    }

  };
  return (
    <Elevation z={1} wrap>
      <div className="item column" onClick={(e) => e.stopPropagation()}>
        {!isLeaderboard && (
          <div className="questionTitle">
            {index + 1}. {data.qText}
          </div>
        )}
        {(isEditable && !isQuestion) && <div className="questionTitle">
          QUESTION: <input key={"main"}
            style={{
              marginLeft: "20px",
              fontWeight: "500",
              fontSize: "1.9vw",
              display: "flex",
              flex: 1,
              flexGrow: 1,
              backgroundColor: "transparent",
              border: "none",
              color: "#673ab7"
            }}
            type="text"
            value={data.qText}
            onChange={(event) => {
              let exde = [...qS]
              exde[0].qText = event.target.value;
              cqS(exde)
            }} />
        </div>}

        {Questions &&
          Questions.map((item, indor) => {
            return <Qer key={og[indor]} item={item} indor={indor} />;
          })}
      </div>
    </Elevation>
  );
};
