import React, { useState } from "react";
import "../App.css";
import { Elevation } from "@rmwc/elevation";
import IconButton from "@material-ui/core/IconButton";
import { FaRegTrashAlt } from "react-icons/fa";
import { Question } from "./Question";
import { Inp } from "./Inp";
export const Leaderquestion = ({ item, index, isManagement, hQD, hE }) => {
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
          > {isManagement ? <Inp color={"#757575"} valium={item.qText} TA isUser us={item} cqS={hE} indor={"qText"} /> : item.qText}

          </div>
          <div
            className="flexcenter normalText"
            style={{ display: "flex", flex: 1, marginLeft: isManagement ? "20px" : "0px", marginRight: isManagement ? "20px" : "0px" }}
          >
            {item.createdAt}
          </div>
          {isManagement && (
            <>
              <div
                className="flexcenter normalText"
                style={{ display: "flex", flex: 1 }}
              >
                <Inp color={"#757575"} small valium={item.correctA} isUser us={item} cqS={hE} indor={"correctA"} />
              </div>
              <div
                className="flexcenter normalText"
                style={{ display: "flex", flex: 1 }}
              >
                <Inp color={"#757575"} small valium={item.answers} isUser us={item} cqS={hE} indor={"answers"} />
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
            <IconButton onClick={(e) => {
              e.stopPropagation()
              hQD(item.qText)
            }}>
              <FaRegTrashAlt color={"#673ab7"} size={28} />
            </IconButton>
          )}
        </div>
        {Selected && (isManagement ? <Question
          isLeaderboard
          isEditable
          isQuestion
          data={item}
          index={index}
          cqS={setQuestions}
          qS={Questions}
          fin={false}
          hun={hE}
        /> :
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
