import React, { useState } from "react";
import "../App.css";
import { Elevation } from "@rmwc/elevation";
import { Question } from "./Question";
export const HistoryItem = ({ item, index }) => {
  const [Selected, setSelected] = useState(false);
  const [Questions] = useState([...item.questions]);
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
            flex: 1,
            width: "100%",
            justifyContent: "space-between",
            alignItems: "space-between",
            justifyItems: "center",
            color: "#757575",
            fontWeight: "400",
            marginBottom: Selected ? 30 : null
          }}
        >
          <div className="normalText" style={{ display: "flex" }}>
            {index + 1}.
          </div>
          <div
            className="flexcenter normalText"
            style={{ display: "flex", flex: 1 }}
          >
            {item.corrects.length}/{item.questions.length}
          </div>
          <div
            className="flexcenter normalText"
            style={{ display: "flex", flex: 1 }}
          >
            {item.createdAt}
          </div>
        </div>
        {Selected && (
          <div className="column">
            {item.questions.map((itemor, indexor) => {
              return (
                <Question
                  key={indexor}
                  data={itemor}
                  index={indexor}
                  cqS={() => null}
                  qS={Questions}
                  fin={true}
                />
              );
            })}
          </div>
        )}
      </div>
    </Elevation>
  );
};
