import React from "react";
import "../App.css";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
const StyledButton = withStyles({
  root: {
    width: "40vw",
    borderRadius: 3,
    border: 0,
    backgroundColor: "#673ab7",
    height: 48,
    padding: "0 30px",
    marginTop: "20px",
    marginBottom: "20px",
    "&:hover": {
      backgroundColor: "#7C4DFF"
    }
  },

  label: {
    textTransform: "capitalize",
    fontSize: "15px",
    color: "#212121"
  }
})(Button);
export const Buttonor = ({ text, func }) => {
  return (
    <StyledButton
      style={{ alignSelf: "center" }}
      onClick={() => func()}
      variant="contained"
    >
      {text}
    </StyledButton>
  );
};
