import React from "react";
import "../App.css";
import IconButton from "@material-ui/core/IconButton";
import { FiLogOut } from "react-icons/fi";
import { FaUser } from "react-icons/fa";
import { Elevation } from "@rmwc/elevation";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import { withStyles } from "@material-ui/core/styles";
const ScreenTabs = withStyles({
  indicator: {
    backgroundColor: "#673ab7"
  }
})(Tabs);

export const Header = ({ screen, cScreen, handleLogout, user }) => {
  return (
    <Elevation z={1} wrap>
      <div className="nomargin header column ">
        <div className="nomargin header ">
          <h1 onClick={() => console.log(user)} className="title-text">
            4answers
          </h1>
          <div
            className="userDiv"
            style={{ flexDirection: "row", marginRight: "2.5vw" }}
          >
            <div
              style={{ marginRight: "1vw" }}
              className="column nomargin flexcenter"
            >
              <div className="row nomargin flexcenter">
                <FaUser color={"#673ab7"} size={28} />
                <p
                  className="nomargin"
                  style={{ marginLeft: "1vw", fontSize: "1.7wv" }}
                >
                  {user.username}
                </p>
              </div>
              <p
                className="nomargin"
                style={{ color: "#757575", fontSize: "1.3vw" }}
              >
                {parseFloat(user.userp).toFixed(2)}% correct
              </p>
            </div>
            <IconButton onClick={() => handleLogout()}>
              <FiLogOut color={"#673ab7"} size={28} />
            </IconButton>
          </div>
        </div>
        <ScreenTabs
          value={screen}
          onChange={(event, value) => cScreen(value)}
          centered
        >
          {user.type === "normal" &&
            ["Test10", "Leaderboard", "History"].map((item, index) => {
              return (
                <Tab
                  label={<span style={{ fontSize: "1.55vw" }}>{item}</span>}
                  key={index}
                />
              );
            })}
          {user.type === "admin" &&
            ["Creation", "Management"].map((item, index) => {
              return (
                <Tab
                  label={<span style={{ fontSize: "1.55vw" }}>{item}</span>}
                  key={index}
                />
              );
            })}
        </ScreenTabs>
      </div>
    </Elevation>
  );
};
