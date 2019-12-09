import React, { useState, useEffect } from "react";
import "../App.css";
import { Question } from "../components/Question";
export const Creation = () => {
  const [Questions, setQuestions] = useState([
    {
      qText: "",
      questions: [
        { value: "", correct: true },
        { value: "", correct: false },
        { value: "", correct: false },
        { value: "", correct: false }
      ]
    }
  ]);
  return (
    <Question
      isLeaderboard
      isEditable
      data={Questions[0]}
      index={0}
      cqS={setQuestions}
      qS={Questions}
      fin={false}
    />
  );
};
