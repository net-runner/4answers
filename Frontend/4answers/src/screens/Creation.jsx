import React, { useState } from "react";
import "../App.css";
import { Question } from "../components/Question";
import { Buttonor } from "../components/Buttonor";

export const Creation = () => {

    const FreshQ = [
        {
            qText: "",
            questions: [
                { value: "", correct: true },
                { value: "", correct: false },
                { value: "", correct: false },
                { value: "", correct: false }
            ]
        }
    ]
    const [Questions, setQuestions] = useState(FreshQ);
    const [errorum, setErrorum] = useState(false)
    const AQ = () => {
        let qute = Questions[0]
        if (qute.qText === ""
            ||
            qute.questions[0].value === ""
            ||
            qute.questions[1].value === ""
            ||
            qute.questions[2].value === ""
            ||
            qute.questions[3].value === "") {
            setErrorum("There are some empty spots in your question")
            setTimeout(() => {
                setErrorum(null)
            }, 3000);
        } else if (
            (qute.questions[0].value === qute.questions[2].value) ||
            (qute.questions[0].value === qute.questions[1].value) ||
            (qute.questions[0].value === qute.questions[3].value) ||

            (qute.questions[1].value === qute.questions[2].value) ||
            (qute.questions[1].value === qute.questions[3].value) ||

            (qute.questions[2].value === qute.questions[3].value)

        ) {
            setErrorum("Some questions are the same")
            setTimeout(() => {
                setErrorum(null)
            }, 3000);
        }
        else {
            fetch("http://localhost/4answers/server/api/cq.php", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    question: Questions[0]
                })
            }).then(result => result.json()).then(data => {
                if (data)
                    if (data.result === "Question with that text exist") {
                        setErrorum("Question with that text exist")
                        setTimeout(() => {
                            setErrorum(null)
                        }, 3000);
                    } else {
                        setQuestions(FreshQ)
                    }

            })
        }


    }
    return (
        <>
            <Question
                key={Questions}
                isLeaderboard
                isEditable
                data={Questions[0]}
                index={0}
                cqS={setQuestions}
                qS={Questions}
                fin={false}
            />
            <Buttonor text={"Add question"} func={AQ} />
            {errorum && <div style={{ color: "#D32F2F" }}>{errorum}</div>}
        </>
    );
};
