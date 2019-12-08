import React, { useState, useEffect } from "react";
import "../App.css";
import { Elevation } from "@rmwc/elevation";
import { Question } from "./Question";
export const Leaderquestion = ({ item, index }) => {
  const [Selected, setSelected] = useState(false);
  const [Questions, setQuestions] = useState([...item.questions]);
  return (
    <Elevation key={index} z={1} wrap>
      <div
        className="column item flexcenter"
        onClick={() => {
          setSelected(!Selected);
        }}
      >
        <div
          key={index}
          className="row"
          style={{
            justifyContent: "space-between",
            alignItems: "space-between",
            justifyItems: "center",
            color: "#757575",
            fontWeight: "400",
            marginBottom: Selected ? 30 : null
          }}
        >
          <div className=" normalText" style={{ display: "flex" }}>
            {index + 1}.
          </div>
          <div
            className="flexcenter normalText"
            style={{ display: "flex", flex: 3 }}
          >
            {item.qText}
          </div>
          <div
            className="flexcenter normalText"
            style={{ display: "flex", flex: 1 }}
          >
            {item.createdAt}
          </div>
          <div
            className="flexcenter normalText"
            style={{ display: "flex", flex: 1 }}
          >
            {parseFloat(item.qp).toFixed(2)}%
          </div>
        </div>
        {Selected && (
          <Question
            isLeaderboard
            data={item}
            index={index}
            cqS={() => null}
            qS={Questions}
            fin={true}
          />
        )}
      </div>
    </Elevation>
  );
};
