import React, { useState, useEffect } from "react";
import "../App.css";
import { Elevation } from "@rmwc/elevation";
import IconButton from "@material-ui/core/IconButton";
import { FaRegTrashAlt } from "react-icons/fa";
import { Question } from "./Question";
export const Leaderquestion = ({ item, index, isManagement, hQD }) => {
  const [Selected, setSelected] = useState(false);
  const [Questions, setQuestions] = useState([...item.questions]);
  return (
    <Elevation key={index} z={1} wrap>
      <div
        className="column item"
        onClick={() => {
          console.log(item);
          console.log(index);
          setSelected(!Selected);
        }}
      >
        <div
          key={index}
          className="row"
          style={{
            justifyContent: "space-between",
            alignItems: "space-between",
            justifyItems: "space-between",
            color: "#757575",
            fontWeight: "400",
            marginBottom: Selected ? 30 : null
          }}
        >
          <div
            className=" normalText"
            style={{
              display: "flex",
              alignContent: "center",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
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
          {isManagement && (
            <>
              <div
                className="flexcenter normalText"
                style={{ display: "flex", flex: 1 }}
              >
                {item.correctA}
              </div>
              <div
                className="flexcenter normalText"
                style={{ display: "flex", flex: 1 }}
              >
                {item.answers}
              </div>
            </>
          )}
          <div
            className="flexcenter normalText"
            style={{ display: "flex", flex: 1 }}
          >
            {parseFloat(item.qp).toFixed(2)}%
          </div>
          {isManagement && (
            <IconButton onClick={() => hQD}>
              <FaRegTrashAlt color={"#673ab7"} size={28} />
            </IconButton>
          )}
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
